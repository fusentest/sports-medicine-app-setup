
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Check, AlertCircle, Heart, Footprints, Flame, Moon, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/lib/supabase';
import { MetricType, METRIC_CONFIGS } from '@/types/biometrics';
import { useToast } from '@/hooks/use-toast';

export default function BiometricsConsent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [dataSharingAllowed, setDataSharingAllowed] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<MetricType[]>([]);

  const metricGroups = {
    'Heart & Vitals': ['heart_rate', 'resting_heart_rate', 'hrv', 'blood_oxygen'] as MetricType[],
    'Activity': ['steps', 'distance', 'workout_minutes', 'exercise_minutes', 'stand_hours'] as MetricType[],
    'Energy': ['calories', 'active_energy'] as MetricType[],
    'Recovery': ['sleep_hours'] as MetricType[],
  };

  const toggleMetric = (metric: MetricType) => {
    setSelectedMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const selectAllMetrics = () => {
    const allMetrics = Object.values(metricGroups).flat();
    setSelectedMetrics(allMetrics);
  };

  const deselectAllMetrics = () => {
    setSelectedMetrics([]);
  };

  const handleSubmit = async () => {
    if (!consentGiven) {
      toast({
        title: 'Consent Required',
        description: 'Please provide consent to continue.',
        variant: 'destructive',
      });
      return;
    }

    if (selectedMetrics.length === 0) {
      toast({
        title: 'Select Metrics',
        description: 'Please select at least one metric to track.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // In a real app, this would use the authenticated user's ID
      // For now, we'll create a demo user or use a placeholder
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw new Error('Please sign in to continue');
      }

      const { error } = await supabase
        .from('health_consent')
        .upsert({
          user_id: userData.user.id,
          consent_given: consentGiven,
          consent_date: new Date().toISOString(),
          metrics_allowed: selectedMetrics,
          data_sharing_allowed: dataSharingAllowed,
        });

      if (error) throw error;

      // Log the consent action
      await supabase.from('biometric_audit_log').insert({
        user_id: userData.user.id,
        action: 'consent_granted',
        details: {
          metrics_allowed: selectedMetrics,
          data_sharing_allowed: dataSharingAllowed,
        },
      });

      toast({
        title: 'Consent Saved',
        description: 'Your preferences have been saved successfully.',
      });

      navigate('/biometrics');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save consent preferences.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Health Data Consent</h1>
          <p className="text-muted-foreground text-lg">
            Control your Apple Watch biometric data sharing
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Your Privacy Matters</AlertTitle>
          <AlertDescription>
            We take your health data seriously. All data is encrypted and stored securely.
            You can revoke consent at any time from your profile settings.
          </AlertDescription>
        </Alert>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Primary Consent</CardTitle>
            <CardDescription>
              Grant permission to collect and store your Apple Watch health data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3 p-4 rounded-lg border border-border bg-muted/50">
              <Checkbox
                id="consent"
                checked={consentGiven}
                onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="consent" className="text-base font-medium cursor-pointer">
                  I consent to the collection and storage of my health data
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  By checking this box, you authorize SportsMed Pro to collect, store, and process
                  your Apple Watch biometric data for health monitoring and analysis purposes.
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/50">
              <div className="flex-1 mr-4">
                <Label htmlFor="data-sharing" className="text-base font-medium">
                  Share data with medical staff
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Allow authorized medical professionals to view your health metrics
                </p>
              </div>
              <Switch
                id="data-sharing"
                checked={dataSharingAllowed}
                onCheckedChange={setDataSharingAllowed}
                disabled={!consentGiven}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Select Metrics to Track</CardTitle>
                <CardDescription>
                  Choose which health metrics you want to monitor
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllMetrics}
                  disabled={!consentGiven}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deselectAllMetrics}
                  disabled={!consentGiven}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(metricGroups).map(([groupName, metrics]) => (
              <div key={groupName}>
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                  {groupName}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {metrics.map((metric) => {
                    const config = METRIC_CONFIGS[metric];
                    return (
                      <div
                        key={metric}
                        className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
                          selectedMetrics.includes(metric)
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-card'
                        } ${!consentGiven ? 'opacity-50' : ''}`}
                      >
                        <Checkbox
                          id={metric}
                          checked={selectedMetrics.includes(metric)}
                          onCheckedChange={() => toggleMetric(metric)}
                          disabled={!consentGiven}
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={metric}
                            className="text-sm font-medium cursor-pointer flex items-center gap-2"
                          >
                            {config.label}
                            <span className="text-xs text-muted-foreground">({config.unit})</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {config.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-success mt-0.5" />
              <span>
                {selectedMetrics.length} metric{selectedMetrics.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          </CardFooter>
        </Card>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={loading || !consentGiven || selectedMetrics.length === 0}
          >
            {loading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
          <h3 className="font-semibold mb-2 text-sm">Data Privacy & Security</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• All health data is encrypted in transit and at rest</li>
            <li>• You can revoke consent and delete your data at any time</li>
            <li>• Data is only shared with authorized medical professionals you approve</li>
            <li>• We comply with HIPAA and healthcare data protection regulations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}