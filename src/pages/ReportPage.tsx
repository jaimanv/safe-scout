import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, AlertTriangle, Send, CheckCircle, Camera, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/Header';
import { SafetyChatbot } from '@/components/SafetyChatbot';
import { crimeTypes } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const ReportPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    location: '',
    crimeType: '',
    timeWindow: '',
    description: '',
    anonymous: true,
  });

  const timeWindows = [
    'Just now',
    'Within the last hour',
    'Earlier today',
    'Yesterday',
    'Within the past week',
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: 'Report Submitted',
        description: 'Thank you for helping make your community safer.',
      });
    }, 1500);
  };

  const isStepValid = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return formData.location.length > 0;
      case 2:
        return formData.crimeType.length > 0;
      case 3:
        return formData.timeWindow.length > 0;
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen gradient-hero">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-xl mx-auto text-center">
            <div className="glass rounded-2xl p-8 border border-border">
              <div className="w-20 h-20 rounded-full bg-safe/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-safe" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">Report Submitted</h1>
              <p className="text-muted-foreground mb-8">
                Thank you for contributing to community safety. Your report helps keep everyone informed
                and makes our neighborhoods safer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => navigate('/')} variant="outline">
                  Back to Home
                </Button>
                <Button onClick={() => { setIsSubmitted(false); setStep(1); setFormData({ location: '', crimeType: '', timeWindow: '', description: '', anonymous: true }); }} className="gradient-primary">
                  Submit Another Report
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Report an Incident</h1>
            <p className="text-muted-foreground">Help make your community safer</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all',
                    step >= s
                      ? 'gradient-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={cn(
                      'w-12 sm:w-20 h-1 mx-2 rounded-full transition-all',
                      step > s ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <div className="glass rounded-2xl p-6 sm:p-8 border border-border">
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Where did it happen?</h2>
                    <p className="text-sm text-muted-foreground">Enter the location of the incident</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Near Central Mall, MG Road"
                    className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full h-12"
                  onClick={() => {
                    setFormData({ ...formData, location: 'Current Location (Auto-detected)' });
                  }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Type of Incident</h2>
                    <p className="text-sm text-muted-foreground">Select the category that best fits</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {crimeTypes.filter(t => t !== 'All').map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, crimeType: type })}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all',
                        formData.crimeType === type
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-muted/30 text-foreground hover:border-primary/50'
                      )}
                    >
                      <span className="font-medium">{type}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">When did it occur?</h2>
                    <p className="text-sm text-muted-foreground">Select the approximate time</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {timeWindows.map((time) => (
                    <button
                      key={time}
                      onClick={() => setFormData({ ...formData, timeWindow: time })}
                      className={cn(
                        'w-full p-4 rounded-xl border text-left transition-all',
                        formData.timeWindow === time
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-muted/30 text-foreground hover:border-primary/50'
                      )}
                    >
                      <span className="font-medium">{time}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Additional Details</h2>
                    <p className="text-sm text-muted-foreground">Optional: Provide more context</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description (Optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what happened..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={formData.anonymous}
                    onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                    className="w-5 h-5 rounded border-border accent-primary"
                  />
                  <label htmlFor="anonymous" className="text-sm text-foreground">
                    Submit anonymously
                  </label>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
                  <h4 className="font-medium text-foreground mb-3">Summary</h4>
                  <p className="text-sm"><span className="text-muted-foreground">Location:</span> {formData.location}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Type:</span> {formData.crimeType}</p>
                  <p className="text-sm"><span className="text-muted-foreground">When:</span> {formData.timeWindow}</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!isStepValid(step)}
                  className="flex-1 gradient-primary"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 gradient-primary"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Info */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            🔒 Your privacy is protected. Reports help improve community safety.
          </p>
        </div>
      </main>

      <SafetyChatbot />
    </div>
  );
};

export default ReportPage;
