import React, { useEffect, useState } from 'react'
import { getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import ControlPanel from '../components/ControlPanel'
import ThresholdCard from '../components/ThresholdCard'
import PageHeader from '../components/PageHeader'
import { createThresholdChangeLog, writeActivityLog } from '../lib/activityLog'
import { cloneThresholds, defaultThresholds, normalizeThresholds, thresholdsDocRef } from '../lib/thresholds'

export default function Controls(){
  const [isAuto, setIsAuto] = useState(true)
  const [thresholds, setThresholds] = useState(defaultThresholds)
  const [savedThresholds, setSavedThresholds] = useState(defaultThresholds)
  const [isLoadingThresholds, setIsLoadingThresholds] = useState(true)
  const [isSavingThresholds, setIsSavingThresholds] = useState(false)
  const [saveState, setSaveState] = useState('idle')
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    let isActive = true

    const loadThresholds = async () => {
      try {
        const snapshot = await getDoc(thresholdsDocRef)

        if (!isActive) {
          return
        }

        if (snapshot.exists()) {
          const nextThresholds = normalizeThresholds(snapshot.data().thresholds)

          setThresholds(nextThresholds)
          setSavedThresholds(cloneThresholds(nextThresholds))
        } else {
          await setDoc(thresholdsDocRef, {
            thresholds: defaultThresholds,
            updatedAt: serverTimestamp(),
          }, { merge: true })
          setSavedThresholds(cloneThresholds(defaultThresholds))
        }
      } catch {
        setSavedThresholds(cloneThresholds(defaultThresholds))
      } finally {
        if (isActive) {
          setIsLoadingThresholds(false)
        }
      }
    }

    loadThresholds()

    return () => {
      isActive = false
    }
  }, [])

  const handleThresholdChange = (sensorKey, bound, value) => {
    setThresholds((currentThresholds) => ({
      ...currentThresholds,
      [sensorKey]: {
        ...currentThresholds[sensorKey],
        [bound]: value,
      },
    }))
  }

  const handleSaveThresholds = async () => {
    setIsSavingThresholds(true)
    setSaveState('idle')

    try {
      const thresholdChangeLog = createThresholdChangeLog(savedThresholds, thresholds)

      await setDoc(thresholdsDocRef, {
        thresholds,
        updatedAt: serverTimestamp(),
      }, { merge: true })

      if (thresholdChangeLog) {
        try {
          await writeActivityLog(thresholdChangeLog)
        } catch {
          // Threshold save should succeed even if activity logging is unavailable.
        }
      }

      setSavedThresholds(cloneThresholds(thresholds))
      setSaveState('saved')
    } catch (err) {
      setSaveState('error')
      setSaveError(String(err?.message || err))
    } finally {
      setIsSavingThresholds(false)
    }
  }

  const handleCancelThresholds = () => {
    setThresholds(cloneThresholds(savedThresholds))
    setSaveState('idle')
    setSaveError('')
  }

  const handleResetThresholds = () => {
    setThresholds(cloneThresholds(defaultThresholds))
    setSaveState('idle')
    setSaveError('')
  }

  const handleToggleAutoMode = () => {
    setIsAuto((currentMode) => {
      const nextMode = !currentMode

      void writeActivityLog({
        type: 'mode_change',
        severity: 'info',
        title: nextMode ? 'Auto mode enabled' : 'Auto mode disabled',
        detail: nextMode
          ? 'Operator enabled adaptive watering mode from the control panel.'
          : 'Operator switched to manual control mode from the control panel.',
        metadata: {
          mode: nextMode ? 'auto' : 'manual',
        },
      }).catch(() => {})

      return nextMode
    })
  }

  const handleManualMist = () => {
    void writeActivityLog({
      type: 'mist_cycle',
      severity: 'warning',
      title: 'Manual mist cycle',
      detail: 'Operator triggered a 15-second mist cycle from the control panel.',
      metadata: {
        durationSeconds: 15,
        modeAtTrigger: isAuto ? 'auto' : 'manual',
      },
    }).catch(() => {})
  }

  return (
    <section className="space-y-4">
      <PageHeader
        label="Device Control"
        title="Device Control Center"
        subtitle="Toggle devices, adjust setpoints, and schedule actions."
      />

      <ThresholdCard
        thresholds={thresholds}
        onThresholdChange={handleThresholdChange}
        onSave={handleSaveThresholds}
        onCancel={handleCancelThresholds}
        onReset={handleResetThresholds}
        isLoading={isLoadingThresholds}
        isSaving={isSavingThresholds}
        saveState={saveState}
        saveError={saveError}
      />

      <ControlPanel
        isAuto={isAuto}
        onToggleAutoMode={handleToggleAutoMode}
        onManualMist={handleManualMist}
      />
    </section>
  )
}
