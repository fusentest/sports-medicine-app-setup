
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, Footprints, Flame, Moon, TrendingUp, Settings, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { BiometricData, HealthConsent, METRIC_CONFIGS } from '@/types/biometrics';
import { useToast } from '@/hooks/use-toast';

export default function Biometrics() {
  const { toast } = useToast();
  const [consent, setConsent] = useState<HealthConsent | null>(null);
  const [loading, setLoading] = useState(true);
  const [biometricData, setBiometricData] = useState<BiometricData[]>([]);

  useEffect(() => {
    fetchConsent();
    fetchBiometricData();
  }, []);

  const fetchConsent = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data, error } = await supabase
        .from('health_consent')
        .select('*')
        .eq('user_id', userData.user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setConsent(data);
    } catch (error: any) {
      console.error('Error fetching consent:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBiometricData = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data, error } = await supabase
        .from('biometric_data')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('recorded_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setBiometricData(data || []);
    } catch (error: any) {
      console.error('Error fetching biometric data:', error);
    }
  };

  const getLatestMetricValue = (metricType: string) => {
    const metric = biometricData.find(d => d.metric_type === metricType);
    return metric ? metric.value : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading biometrics...</p>
        </div>
      </div>
    );
  }

  if (!consent || !consent.consent_given) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
                <Activity className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Apple Watch Integration</CardTitle>
              <CardDescription>
                Connect your Apple Watch to track your health metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Heart Rate</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Footprints className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <p className="text-sm font-medium">Activity</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Flame className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="text-sm font-medium">Calories</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Moon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Sleep</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Features:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-success mt-0.5" />
                    <span>Real-time health monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-success mt-0.5" />
                    <span>Personalized insights and trends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-success mt-0.5" />
                    <span>Share data with medical professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-success mt-0.5" />
                    <span>Secure and private data storage</span>
                  </li>
                </ul>
              </div>

              <Link to="/biometrics/consent">
                <Button className="w-full" size="lg">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Health Metrics</h1>
            <p className="text-muted-foreground">
              Track your Apple Watch biometric data
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/biometrics/consent">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {consent.metrics_allowed.slice(0, 4).map((metricType) => {
            const config = METRIC_CONFIGS[metricType];
            const value = getLatestMetricValue(metricType);
            
            return (
              <Card key={metricType}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {config.label}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Live
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      {value !== null ? value.toFixed(0) : '--'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {config.unit}
                    </span>
                  </div>
                  {config.normalRange && value !== null && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Normal: {config.normalRange.min}-{config.normalRange.max} {config.unit}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Metrics</CardTitle>
            <CardDescription>
              View and analyze your health data over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <TabsContent value="today" className="space-y-4 mt-4">
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No data available for today</p>
                  <p className="text-sm mt-2">Connect your Apple Watch to start tracking</p>
                </div>
              </TabsContent>
              <TabsContent value="week" className="space-y-4 mt-4">
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No data available for this week</p>
                </div>
              </TabsContent>
              <TabsContent value="month" className="space-y-4 mt-4">
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No data available for this month</p>
                </div>
              </TabsContent>
              <TabsContent value="year" className="space-y-4 mt-4">
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No data available for this year</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}