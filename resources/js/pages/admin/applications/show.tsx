import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
    application: {
        id: number;
        student_name: string;
        birth_date: string;
        full_address: string;
        previous_school: string;
        parent_name: string;
        parent_contact: string;
        status: 'pending' | 'accepted' | 'rejected';
        status_display: string;
        status_badge_color: string;
        created_at: string;
        updated_at: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kelola Pendaftaran', href: '/applications' },
    { title: 'Detail Pendaftaran', href: '#' },
];

export default function AdminShowApplication({ application }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleUpdateStatus = (status: 'pending' | 'accepted' | 'rejected') => {
        router.put(route('admin.applications.update', application.id), {
            status: status
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Optional: show success message
            }
        });
    };

    const handleBackToList = () => {
        router.get(route('applications.index'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin - Pendaftaran ${application.student_name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Detail Pendaftaran</h1>
                        <p className="text-gray-600">Kelola dan verifikasi pendaftaran peserta didik baru</p>
                    </div>
                    <Button variant="outline" onClick={handleBackToList}>
                        ← Kembali ke Daftar
                    </Button>
                </div>

                {/* Status Management */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            🏥 Kelola Status Pendaftaran
                        </CardTitle>
                        <CardDescription>
                            Ubah status pendaftaran sesuai hasil verifikasi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-lg">Status saat ini:</span>
                                <Badge className={application.status_badge_color}>
                                    {application.status_display}
                                </Badge>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            <Button
                                variant={application.status === 'pending' ? 'default' : 'outline'}
                                onClick={() => handleUpdateStatus('pending')}
                                disabled={application.status === 'pending'}
                                size="sm"
                            >
                                ⏳ Pending
                            </Button>
                            <Button
                                variant={application.status === 'accepted' ? 'default' : 'outline'}
                                onClick={() => handleUpdateStatus('accepted')}
                                disabled={application.status === 'accepted'}
                                size="sm"
                                className={application.status === 'accepted' ? 'bg-green-600 hover:bg-green-700' : ''}
                            >
                                ✅ Terima
                            </Button>
                            <Button
                                variant={application.status === 'rejected' ? 'default' : 'outline'}
                                onClick={() => handleUpdateStatus('rejected')}
                                disabled={application.status === 'rejected'}
                                size="sm"
                                className={application.status === 'rejected' ? 'bg-red-600 hover:bg-red-700' : ''}
                            >
                                ❌ Tolak
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Student Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                👤 Data Siswa
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Nama Lengkap:</span>
                                <span className="col-span-2 text-sm font-medium">{application.student_name}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Tanggal Lahir:</span>
                                <span className="col-span-2 text-sm">{formatDate(application.birth_date)}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Alamat Lengkap:</span>
                                <span className="col-span-2 text-sm">{application.full_address}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Asal Sekolah:</span>
                                <span className="col-span-2 text-sm">{application.previous_school}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Parent Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                👨‍👩‍👧‍👦 Data Orang Tua/Wali
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Nama:</span>
                                <span className="col-span-2 text-sm font-medium">{application.parent_name}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Nomor Kontak:</span>
                                <span className="col-span-2 text-sm">
                                    <a 
                                        href={`tel:${application.parent_contact}`}
                                        className="text-blue-600 hover:text-blue-800 underline"
                                    >
                                        {application.parent_contact}
                                    </a>
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🔐 Informasi Akun Pendaftar
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Nama Akun:</span>
                                <span className="col-span-2 text-sm">{application.user.name}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Email:</span>
                                <span className="col-span-2 text-sm">
                                    <a 
                                        href={`mailto:${application.user.email}`}
                                        className="text-blue-600 hover:text-blue-800 underline"
                                    >
                                        {application.user.email}
                                    </a>
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📅 Riwayat Pendaftaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Tanggal Daftar:</span>
                                <span className="col-span-2 text-sm">{formatDate(application.created_at)}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Terakhir Diupdate:</span>
                                <span className="col-span-2 text-sm">{formatDate(application.updated_at)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Admin Notes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            📝 Catatan untuk Admin
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-800 mb-2">Checklist Verifikasi:</h3>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>□ Verifikasi kelengkapan data siswa</li>
                                <li>□ Konfirmasi kebenaran alamat</li>
                                <li>□ Validasi informasi asal sekolah</li>
                                <li>□ Verifikasi data orang tua/wali</li>
                                <li>□ Cek ketersediaan kuota</li>
                                <li>□ Konfirmasi final keputusan</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}