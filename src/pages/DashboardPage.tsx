import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom component from <custom_component_code>
import Footer from '@/components/layout/Footer'; // Custom component from <custom_component_code>
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn/ui
import { Button } from "@/components/ui/button"; // shadcn/ui
import { Textarea } from "@/components/ui/textarea"; // shadcn/ui
import { LogOut } from 'lucide-react'; // Icon

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would also clear authentication tokens/state here
    console.log('User initiated logout.');
    navigate('/'); // Navigate to LoginPage (path "/" as defined in App.tsx)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        isAuthenticated={true} 
        userName="Authenticated User" // Placeholder username
        onLogout={handleLogout} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <Card className="w-full max-w-lg shadow-xl bg-white rounded-lg">
          <CardHeader className="text-center p-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome to Your Dashboard!
            </CardTitle>
            <CardDescription className="text-sm sm:text-md text-gray-600 pt-2">
              You have successfully logged in. This is your secure area.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <p className="text-gray-700 text-center sm:text-left">
              From here, you would typically access application features, manage your profile, or view specific data.
            </p>
            
            <div className="space-y-2">
              <label htmlFor="userFeedback" className="block text-sm font-medium text-gray-700">
                Quick Notes / Feedback (Example Textarea):
              </label>
              <Textarea
                id="userFeedback"
                placeholder="You can use this space for quick notes or feedback..."
                className="min-h-[100px] focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                defaultValue="This is a sample note. Feel free to type here."
              />
            </div>

            <Button 
              onClick={handleLogout} 
              className="w-full py-3 text-base font-medium rounded-md"
              variant="destructive" // Using destructive variant for logout action
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;