import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Apply() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    socialHandle: '',
    revenue: '',
    contentChallenge: '',
  });

  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Capture UTM parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = params.get(param);
      if (value) utms[param] = value;
    });
    
    setUtmParams(utms);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.revenue) newErrors.revenue = 'Please select your annual revenue';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Check qualification logic
    const qualifiedRevenues = ['£50-100K', '£100-250K', '£250K+'];
    const isQualified = qualifiedRevenues.includes(formData.revenue);

    if (isQualified) {
      setIsSubmitting(true);
      
      try {
        // Submit to backend API
        const response = await fetch('/api/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            utmParams,
            qualified: true,
          }),
        });

        if (!response.ok) throw new Error('Submission failed');

        // Show Calendly embed
        setShowCalendly(true);
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Something went wrong. Please try again or contact us directly.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Show rejection message
      setShowRejection(true);
      
      // Still submit to backend for waitlist
      try {
        await fetch('/api/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            utmParams,
            qualified: false,
          }),
        });
      } catch (error) {
        console.error('Waitlist submission error:', error);
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Load Calendly script
  useEffect(() => {
    if (showCalendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showCalendly]);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <a href="/" className="flex items-center gap-3">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/earnedreach-logo-transparent-gJlZYvX6K3RqJ9xM8LqB3qZ8zVqMYJ.png" 
              alt="EarnedReach" 
              className="h-8"
            />
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {!showCalendly && !showRejection && (
            <>
              {/* Hero Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Apply to Work with EarnedReach
                </h1>
                <p className="text-xl text-gray-300">
                  We partner with 6-figure entrepreneurs to turn content into owned traffic and revenue.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName" className="text-white">
                    Full Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="John Smith"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Business Name */}
                <div>
                  <Label htmlFor="businessName" className="text-white">
                    Business Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Your Business Ltd"
                  />
                  {errors.businessName && (
                    <p className="text-red-400 text-sm mt-1">{errors.businessName}</p>
                  )}
                </div>

                {/* Social Handle */}
                <div>
                  <Label htmlFor="socialHandle" className="text-white">
                    Instagram/LinkedIn Handle
                  </Label>
                  <Input
                    id="socialHandle"
                    type="text"
                    value={formData.socialHandle}
                    onChange={(e) => handleChange('socialHandle', e.target.value)}
                    className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="@yourhandle or linkedin.com/in/yourprofile"
                  />
                </div>

                {/* Annual Revenue */}
                <div>
                  <Label htmlFor="revenue" className="text-white">
                    Annual Revenue <span className="text-red-400">*</span>
                  </Label>
                  <Select value={formData.revenue} onValueChange={(value) => handleChange('revenue', value)}>
                    <SelectTrigger className="mt-2 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your annual revenue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<£25K">&lt;£25K</SelectItem>
                      <SelectItem value="£25-50K">£25-50K</SelectItem>
                      <SelectItem value="£50-100K">£50-100K</SelectItem>
                      <SelectItem value="£100-250K">£100-250K</SelectItem>
                      <SelectItem value="£250K+">£250K+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.revenue && (
                    <p className="text-red-400 text-sm mt-1">{errors.revenue}</p>
                  )}
                </div>

                {/* Content Challenge */}
                <div>
                  <Label htmlFor="contentChallenge" className="text-white">
                    What's your biggest content challenge?
                  </Label>
                  <Textarea
                    id="contentChallenge"
                    value={formData.contentChallenge}
                    onChange={(e) => handleChange('contentChallenge', e.target.value)}
                    className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
                    placeholder="Tell us about your content goals and challenges..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3b9eff] hover:bg-[#2a8eef] text-white font-semibold py-6 text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </>
          )}

          {/* Calendly Embed (Qualified) */}
          {showCalendly && (
            <div className="space-y-6">
              <div className="text-center bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h2 className="text-2xl font-bold mb-2">You're a Great Fit!</h2>
                <p className="text-gray-300">
                  Book your discovery call below to discuss how we can help you turn content into revenue.
                </p>
              </div>

              {/* Calendly Inline Widget */}
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/YOUR_CALENDLY_USERNAME/discovery-call?hide_gdpr_banner=1"
                style={{ minWidth: '320px', height: '700px' }}
              />
            </div>
          )}

          {/* Rejection Message (Not Qualified) */}
          {showRejection && (
            <div className="space-y-6">
              <div className="text-center bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-8">
                <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-3">Not Quite the Right Fit—Yet</h2>
                <p className="text-gray-300 mb-6">
                  Thanks for your interest in EarnedReach. Based on your current revenue, we'd recommend waiting until you're generating at least <strong>£50k/year</strong>.
                </p>
                <p className="text-gray-300 mb-6">
                  We'll keep your details on file and reach out when we have capacity for earlier-stage brands.
                </p>
                <div className="text-left bg-white/5 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold mb-3">In the meantime, focus on:</h3>
                  <ol className="space-y-2 text-gray-300">
                    <li><strong>1. Consistency</strong> - Post regularly to build momentum</li>
                    <li><strong>2. Clarity</strong> - Nail your messaging and positioning</li>
                    <li><strong>3. Systems</strong> - Document your content process</li>
                  </ol>
                </div>
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-[#3b9eff] hover:bg-[#2a8eef] text-white"
                >
                  Back to Homepage
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
