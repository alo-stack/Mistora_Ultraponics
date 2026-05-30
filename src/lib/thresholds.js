import { doc } from 'firebase/firestore'
import { db } from '../firebase'

export const defaultThresholds = {
  temp: { min: '24', max: '28' },
  humidity: { min: '65', max: '80' },
  ec: { min: '1.4', max: '2.0' },
}

export const thresholdsDocRef = doc(db, 'settings', 'thresholds')

export const cloneThresholds = (thresholdSet) => ({
  temp: { ...thresholdSet.temp },
  humidity: { ...thresholdSet.humidity },
  ec: { ...thresholdSet.ec },
})

export const normalizeThresholds = (thresholds, fallback = defaultThresholds) => ({
  temp: {
    min: String(thresholds?.temp?.min ?? fallback.temp.min),
    max: String(thresholds?.temp?.max ?? fallback.temp.max),
  },
  humidity: {
    min: String(thresholds?.humidity?.min ?? fallback.humidity.min),
    max: String(thresholds?.humidity?.max ?? fallback.humidity.max),
  },
  ec: {
    min: String(thresholds?.ec?.min ?? fallback.ec.min),
    max: String(thresholds?.ec?.max ?? fallback.ec.max),
  },
})