import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: 'applicant' | 'admin';
        };
    };
    application?: {
        id: number;
        student_name: string;
        status: 'pending' | 'accepted' | 'rejected';
        status_display: string;
        status_badge_color: string;
        created_at: string;
    };
    stats?: {
        total_applications: number;
        pending_applications: number;
        accepted_applications: number;
        rejected_applications: number;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ auth, application, stats }: Props) {
    const handleCreateApplication = () => {
        router.get(route('applications.create'));
    };

    const handleViewApplication = () => {
        if (application) {
            router.get(route('applications.show', application.id));
        }
    };

    const handleViewAllApplications = () => {
        router.get(route('applications.index'));
    };

    // Admin Dashboard
    if (auth.user.role === 'admin') {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard Admin" />
                <div className="flex h-full flex-1 flex-col gap-6 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard Administrator</h1>
                            <p className="text-gray-600">Kelola pendaftaran peserta didik baru</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
                                <span className="text-2xl">📊</span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats?.total_applications || 0}</div>
                                <p className="text-xs text-muted-foreground">Total pendaftaran</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Menunggu Verifikasi</CardTitle>
                                <span className="text-2xl">⏳</span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-600">{stats?.pending_applications || 0}</div>
                                <p className="text-xs text-muted-foreground">Butuh tindakan</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Diterima</CardTitle>
                                <span className="text-2xl">✅</span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{stats?.accepted_applications || 0}</div>
                                <p className="text-xs text-muted-foreground">Pendaftar diterima</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
                                <span className="text-2xl">❌</span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">{stats?.rejected_applications || 0}</div>
                                <p className="text-xs text-muted-foreground">Pendaftar ditolak</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📋 Kelola Pendaftaran
                                </CardTitle>
                                <CardDescription>
                                    Lihat dan verifikasi pendaftaran peserta didik baru
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={handleViewAllApplications} className="w-full">
                                    Lihat Semua Pendaftaran
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📈 Statistik
                                </CardTitle>
                                <CardDescription>
                                    Monitoring progress pendaftaran secara real-time
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Tingkat Penerimaan</span>
                                        <span className="font-medium">
                                            {stats?.total_applications ? 
                                                Math.round(((stats?.accepted_applications || 0) / stats.total_applications) * 100) : 0}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-green-600 h-2 rounded-full" 
                                            style={{ 
                                                width: `${stats?.total_applications ? 
                                                    ((stats?.accepted_applications || 0) / stats.total_applications) * 100 : 0}%` 
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AppLayout>
        );
    }

    // Applicant Dashboard
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Pendaftar" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard Pendaftar</h1>
                        <p className="text-gray-600">Kelola pendaftaran Anda</p>
                    </div>
                </div>

                {application ? (
                    /* User has application */
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📋 Status Pendaftaran
                                </CardTitle>
                                <CardDescription>
                                    Informasi terkini tentang pendaftaran Anda
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Nama Siswa:</span>
                                    <span className="text-sm">{application.student_name}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Status:</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${application.status_badge_color}`}>
                                        {application.status_display}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Tanggal Daftar:</span>
                                    <span className="text-sm">
                                        {new Date(application.created_at).toLocaleDateString('id-ID')}
                                    </span>
                                </div>
                                <Button onClick={handleViewApplication} className="w-full mt-4">
                                    Lihat Detail Pendaftaran
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    {application.status === 'pending' ? '⏳' : application.status === 'accepted' ? '🎉' : '📝'} 
                                    Informasi Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {application.status === 'pending' && (
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-600">
                                            Pendaftaran Anda sedang dalam proses verifikasi oleh admin sekolah.
                                        </p>
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                            <p className="text-sm text-yellow-800">
                                                💡 Pastikan semua data yang Anda berikan sudah benar dan lengkap.
                                            </p>
                                        </div>
                                    </div>
                                )}
                                
                                {application.status === 'accepted' && (
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-600">
                                            Selamat! Pendaftaran Anda telah diterima.
                                        </p>
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                            <p className="text-sm text-green-800">
                                                🎊 Silakan tunggu informasi lebih lanjut dari pihak sekolah.
                                            </p>
                                        </div>
                                    </div>
                                )}
                                
                                {application.status === 'rejected' && (
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-600">
                                            Maaf, pendaftaran Anda belum dapat kami terima saat ini.
                                        </p>
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                            <p className="text-sm text-red-800">
                                                📞 Hubungi admin sekolah untuk informasi lebih lanjut.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    /* User doesn't have application */
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="flex items-center justify-center gap-2 text-xl">
                                🚀 Mulai Pendaftaran Anda
                            </CardTitle>
                            <CardDescription>
                                Anda belum memiliki pendaftaran. Mulai proses pendaftaran PPDB sekarang!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-semibold text-blue-800 mb-2">Yang perlu Anda siapkan:</h3>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Data lengkap siswa (nama, tanggal lahir, alamat)</li>
                                    <li>• Informasi asal sekolah</li>
                                    <li>• Data orang tua/wali (nama, nomor kontak)</li>
                                </ul>
                            </div>
                            <Button onClick={handleCreateApplication} size="lg" className="w-full">
                                📝 Buat Pendaftaran Baru
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}