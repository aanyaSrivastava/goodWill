import React, { useState, useEffect } from 'react';
import { PeopleInNeed } from './PeopleInNeed';
import { usePoints } from '../contexts/PointsContext';
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DonorData {
  donorName: string;
  age: string;
  gender: string;
  phone: string;
  bloodGroup: string;
  availability: Date | undefined;
  address: string;
  recentlyDonated: string;
  weight: string;
}

export const BloodDonationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState<DonorData>({
    donorName: '',
    age: '',
    gender: 'male',
    phone: '',
    bloodGroup: 'A+',
    availability: undefined,
    address: '',
    recentlyDonated: 'no',
    weight: '',
  });

  useEffect(() => {
    if (date) {
      setFormData(prev => ({ ...prev, availability: date }));
    }
  }, [date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const age = parseInt(formData.age);
    const weight = parseInt(formData.weight);

    if (age < 16 || age > 65) {
      toast({
        title: "Age restriction",
        description: "Donors must be between 16 and 65 years old.",
        variant: "destructive",
      });
      return;
    }

    if (weight < 50) {
      toast({
        title: "Weight restriction",
        description: "Donors must weigh at least 50 kg.",
        variant: "destructive",
      });
      return;
    }

    if (formData.recentlyDonated === 'yes') {
      toast({
        title: "Recent donation",
        description: "You cannot donate if you have donated within the last 2 months.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.availability) {
      toast({
        title: "Availability required",
        description: "Please select your availability date.",
        variant: "destructive",
      });
      return;
    }
    
    // Save donor data to localStorage
    const existingDonors = JSON.parse(localStorage.getItem('blood-donors') || '[]');
    const updatedDonors = [...existingDonors, formData];
    localStorage.setItem('blood-donors', JSON.stringify(updatedDonors));
    
    toast({
      title: "Thank you for registering!",
      description: "Your information has been saved. You may be contacted when someone needs your blood type.",
      variant: "default",
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <PeopleInNeed donorBloodGroup={formData.bloodGroup} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blood">Donate Blood</h2>
          <p className="text-muted-foreground">Please fill in your details to become a donor</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="donorName" className="block text-sm font-medium">
              Donor Name
            </label>
            <input
              id="donorName"
              name="donorName"
              type="text"
              required
              value={formData.donorName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              required
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
              placeholder="Must be 16-65"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="weight" className="block text-sm font-medium">
              Weight (kg)
            </label>
            <input
              id="weight"
              name="weight"
              type="number"
              required
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
              placeholder="Must be at least 50 kg"
            />
            <p className="text-xs text-muted-foreground">Must be at least 50 kg</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
              placeholder="We'll contact you here"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="recentlyDonated" className="block text-sm font-medium">
              Donated Blood Within Last 2 Months?
            </label>
            <select
              id="recentlyDonated"
              name="recentlyDonated"
              required
              value={formData.recentlyDonated}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blood text-white font-medium rounded-lg shadow-sm hover:bg-blood-dark transition-colors button-effect"
          >
            Register as Donor
          </button>
        </div>
      </form>
    </div>
  );
};
