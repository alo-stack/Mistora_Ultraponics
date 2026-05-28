import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const activityLogsCollectionRef = collection(db, 'activity_logs')

const toNumber = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const formatNumber = (value) => {
  const numberValue = toNumber(value)
  return numberValue === null ? String(value) : `${numberValue}`
}

export const createThresholdChangeLog = (previousThresholds, nextThresholds) => {
  const sensorLabels = {
    temp: 'Temperature',
    humidity: 'Humidity',
    ec: 'EC',
  }

  const units = {
    temp: 'deg C',
    humidity: '%',
    ec: 'mS/cm',
  }

  const changes = []

  Object.keys(sensorLabels).forEach((sensorKey) => {
    const previousSensor = previousThresholds[sensorKey]
    const nextSensor = nextThresholds[sensorKey]

    if (!previousSensor || !nextSensor) {
      return
    }

    ;['min', 'max'].forEach((bound) => {
      const previousValue = String(previousSensor[bound])
      const nextValue = String(nextSensor[bound])

      if (previousValue !== nextValue) {
        changes.push({
          sensorKey,
          sensorLabel: sensorLabels[sensorKey],
          bound,
          from: previousValue,
          to: nextValue,
          unit: units[sensorKey],
        })
      }
    })
  })

  if (changes.length === 0) {
    return null
  }

  const detail = changes
    .map((change) => `${change.sensorLabel} ${change.bound.toUpperCase()} ${formatNumber(change.from)} -> ${formatNumber(change.to)} ${change.unit}`)
    .join(' | ')

  return {
    type: 'threshold_change',
    severity: 'info',
    title: changes.length === 1 ? 'Threshold updated' : `Thresholds updated (${changes.length})`,
    detail,
    metadata: {
      changes,
    },
  }
}

export const writeActivityLog = async ({
  type,
  title,
  detail,
  severity = 'info',
  metadata = {},
}) => {
  if (!type || !title || !detail) {
    return
  }

  await addDoc(activityLogsCollectionRef, {
    type,
    title,
    detail,
    severity,
    metadata,
    source: 'dashboard',
    createdAt: serverTimestamp(),
  })
}
