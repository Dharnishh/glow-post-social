
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import i18n from '@/i18n';
import { useToast } from "@/hooks/use-toast";

interface OnboardingStep {
  title: string;
  description: string;
  image: string;
}

const Onboarding: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    toast({
      title: t('Language Changed'),
      description: t('The language has been updated successfully'),
      duration: 2000,
    });
  };

  const onboardingSteps: OnboardingStep[] = [
    {
      title: t('Welcome to SocialGlow'),
      description: t('Manage all your social media accounts in one place. Perfect for local businesses and small shops.'),
      image: '✨',
    },
    {
      title: t('Connect Your Accounts'),
      description: t('Add your Instagram, Facebook, Twitter, YouTube, TikTok, and WhatsApp accounts to get started.'),
      image: '🔗',
    },
    {
      title: t('Create and Schedule Posts'),
      description: t('Upload images and videos, write captions, and post to multiple platforms with a single click.'),
      image: '📱',
    },
    {
      title: t('AI-Powered Tools'),
      description: t('Use our AI tools to generate captions, hashtags, and content ideas to enhance your social media presence.'),
      image: '🤖',
    },
  ];

  const handleContinue = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Go to home page when onboarding is complete
      toast({
        title: t('Welcome to SocialGlow!'),
        description: t('Your social media journey starts now'),
        duration: 3000,
      });
      navigate('/');
    }
  };

  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <div className="min-h-screen flex flex-col justify-between p-4">
      {/* Language selector at the top */}
      <div className="mb-8">
        <p className="text-sm mb-2">{t('language')}</p>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-full bg-secondary/80 border-accent/30">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
            <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
            <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Onboarding content */}
      <Card className="flex-1 flex flex-col items-center justify-center p-6 bg-secondary/80 border-accent/30 text-center animate-fade-in shadow-lg">
        <div className="text-7xl mb-6 animate-bounce">{onboardingSteps[currentStep].image}</div>
        <h1 className="text-2xl font-bold mb-4 text-glow">{onboardingSteps[currentStep].title}</h1>
        <p className="text-lg mb-8">{onboardingSteps[currentStep].description}</p>
      </Card>

      {/* Step indicators */}
      <div className="flex justify-center my-8">
        {onboardingSteps.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full mx-1 transition-all duration-300 ${
              index === currentStep ? 'bg-neon-purple w-8' : 'bg-gray-600 w-2'
            }`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        onClick={handleContinue}
        className="w-full py-6 text-lg bg-gradient-to-r from-neon-purple to-neon-pink text-white btn-glow-pink hover:scale-105 transition-transform"
      >
        {isLastStep ? t('Get Started') : t('Continue')}
      </Button>
    </div>
  );
};

export default Onboarding;
