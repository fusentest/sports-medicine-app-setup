
export type MetricType = 
  | 'heart_rate'
  | 'steps'
  | 'calories'
  | 'distance'
  | 'active_energy'
  | 'resting_heart_rate'
  | 'hrv'
  | 'blood_oxygen'
  | 'sleep_hours'
  | 'workout_minutes'
  | 'stand_hours'
  | 'exercise_minutes';

export interface BiometricData {
  id: string;
  user_id: string;
  metric_type: MetricType;
  value: number;
  unit: string;
  recorded_at: string;
  device_type?: string;
  device_model?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface HealthConsent {
  id: string;
  user_id: string;
  consent_given: boolean;
  consent_date?: string;
  metrics_allowed: MetricType[];
  data_sharing_allowed: boolean;
  revoked_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MetricConfig {
  type: MetricType;
  label: string;
  unit: string;
  icon: string;
  description: string;
  normalRange?: { min: number; max: number };
}

export const METRIC_CONFIGS: Record<MetricType, MetricConfig> = {
  heart_rate: {
    type: 'heart_rate',
    label: 'Heart Rate',
    unit: 'bpm',
    icon: 'Heart',
    description: 'Real-time heart rate monitoring',
    normalRange: { min: 60, max: 100 }
  },
  steps: {
    type: 'steps',
    label: 'Steps',
    unit: 'steps',
    icon: 'Footprints',
    description: 'Daily step count',
  },
  calories: {
    type: 'calories',
    label: 'Calories',
    unit: 'kcal',
    icon: 'Flame',
    description: 'Calories burned',
  },
  distance: {
    type: 'distance',
    label: 'Distance',
    unit: 'km',
    icon: 'MapPin',
    description: 'Distance traveled',
  },
  active_energy: {
    type: 'active_energy',
    label: 'Active Energy',
    unit: 'kcal',
    icon: 'Zap',
    description: 'Energy from activity',
  },
  resting_heart_rate: {
    type: 'resting_heart_rate',
    label: 'Resting Heart Rate',
    unit: 'bpm',
    icon: 'Heart',
    description: 'Heart rate at rest',
    normalRange: { min: 50, max: 90 }
  },
  hrv: {
    type: 'hrv',
    label: 'Heart Rate Variability',
    unit: 'ms',
    icon: 'Activity',
    description: 'HRV measurement',
  },
  blood_oxygen: {
    type: 'blood_oxygen',
    label: 'Blood Oxygen',
    unit: '%',
    icon: 'Wind',
    description: 'Blood oxygen saturation',
    normalRange: { min: 95, max: 100 }
  },
  sleep_hours: {
    type: 'sleep_hours',
    label: 'Sleep',
    unit: 'hours',
    icon: 'Moon',
    description: 'Sleep duration',
  },
  workout_minutes: {
    type: 'workout_minutes',
    label: 'Workout',
    unit: 'min',
    icon: 'Dumbbell',
    description: 'Workout duration',
  },
  stand_hours: {
    type: 'stand_hours',
    label: 'Stand Hours',
    unit: 'hours',
    icon: 'User',
    description: 'Hours standing',
  },
  exercise_minutes: {
    type: 'exercise_minutes',
    label: 'Exercise',
    unit: 'min',
    icon: 'Activity',
    description: 'Exercise minutes',
  },
};