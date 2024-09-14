'use client';

import {
  BarChart,
  Bell,
  Download,
  LineChart,
  Menu,
  Plus,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { DashboardFooter } from '@/app/[locale]/(auth)/new-dashboard/_components/DashboardFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent } from '@/components/ui/tabs';

export default function Dashboard() {
  const t = useTranslations('Dashboard');

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container mx-auto flex h-14 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 bg-gray-900 p-0 text-gray-100"
            >
              <nav className="flex flex-col space-y-2 p-4">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setActiveTab('overview')}
                >
                  <LineChart className="mr-2 size-4" />
                  Overview
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setActiveTab('analytics')}
                >
                  <BarChart className="mr-2 size-4" />
                  Analytics
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="mr-2 size-4" />
                  Settings
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <LineChart className="size-6 text-blue-500" />
            <span className="font-bold">{t('meta_title')}</span>
          </Link>
          <nav className="mx-6 hidden items-center space-x-4 md:flex lg:space-x-6">
            <Button
              variant="ghost"
              className="text-sm font-medium transition-colors hover:text-blue-500"
            >
              Overview
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium transition-colors hover:text-blue-500"
            >
              Analytics
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium transition-colors hover:text-blue-500"
            >
              Reports
            </Button>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="size-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 py-6">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 hidden md:block lg:w-1/5">
            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setActiveTab('overview')}
              >
                <LineChart className="mr-2 size-4" />
                Overview
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setActiveTab('analytics')}
              >
                <BarChart className="mr-2 size-4" />
                Analytics
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="mr-2 size-4" />
                Settings
              </Button>
            </nav>
          </aside>
          <div className="flex-1 lg:max-w-4xl">
            <Tabs value={activeTab} className="space-y-4">
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="border-gray-700 bg-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total CVs
                      </CardTitle>
                      <LineChart className="size-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">128</div>
                      <p className="text-xs text-gray-400">
                        +10% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-700 bg-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        AI Optimizations
                      </CardTitle>
                      <Settings className="size-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">512</div>
                      <p className="text-xs text-gray-400">
                        +22% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-700 bg-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Blockchain Verifications
                      </CardTitle>
                      <Download className="size-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">64</div>
                      <p className="text-xs text-gray-400">
                        +8% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-700 bg-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Users
                      </CardTitle>
                      <User className="size-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">256</div>
                      <p className="text-xs text-gray-400">
                        +15% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4 border-gray-700 bg-gray-800">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          'CV optimized for Software Engineer role',
                          'New blockchain verification added',
                          'Skills gap analysis completed',
                          'CV exported in PDF format',
                        ].map((activity) => (
                          <div key={activity} className="flex items-center">
                            <div className="mr-2 size-2 rounded-full bg-blue-500" />
                            <p className="text-sm">{activity}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3 border-gray-700 bg-gray-800">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 size-4" /> Create New CV
                      </Button>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Download className="mr-2 size-4" /> Export CV
                      </Button>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Settings className="mr-2 size-4" /> Optimize CV
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <Card className="border-gray-700 bg-gray-800">
                  <CardHeader>
                    <CardTitle>Analytics Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Your analytics content goes here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <Card className="border-gray-700 bg-gray-800">
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        className="border-gray-600 bg-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                        className="border-gray-600 bg-gray-700"
                      />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
