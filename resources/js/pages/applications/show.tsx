import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    { title: 'Detail Pendaftaran', href: '#' },
];

export default function ShowApplication({ application }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Pendaftaran - ${application.student_name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Detail Pendaftaran</h1>
                        <p className="text-gray-600">Informasi lengkap pendaftaran PPDB</p>
                    </div>
                    <div className="flex gap-3">
                        {application.status === 'pending' && (
                            <Link href={route('applications.edit', application.id)}>
                                <Button variant="outline">
                                    ✏️ Edit Data
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Status Card */}
                <Card className={
                    application.status === 'pending' ? 'border-yellow-200 bg-yellow-50' :
                    application.status === 'accepted' ? 'border-green-200 bg-green-50' :
                    'border-red-200 bg-red-50'
                }>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">
                                    {application.status === 'pending' ? '⏳' : 
                                     application.status === 'accepted' ? '🎉' : '❌'}
                                </span>
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Status: {application.status_display}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {application.status === 'pending' && 'Menunggu verifikasi dari admin sekolah'}
                                        {application.status === 'accepted' && 'Selamat! Pendaftaran Anda diterima'}
                                        {application.status === 'rejected' && 'Pendaftaran belum dapat diterima'}
                                    </p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${application.status_badge_color}`}>
                                {application.status_display}
                            </span>
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
                                <span className="col-span-2 text-sm">{application.student_name}</span>
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
                                <span className="col-span-2 text-sm">{application.parent_name}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Nomor Kontak:</span>
                                <span className="col-span-2 text-sm">{application.parent_contact}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🔐 Informasi Akun
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Nama Akun:</span>
                                <span className="col-span-2 text-sm">{application.user.name}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="font-medium text-sm text-gray-500">Email:</span>
                                <span className="col-span-2 text-sm">{application.user.email}</span>
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

                {/* Additional Information */}
                {application.status === 'pending' && (
                    <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">💡</span>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-blue-800">Tips Menunggu Verifikasi</h3>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        <li>• Pastikan nomor kontak yang tercantum aktif dan dapat dihubungi</li>
                                        <li>• Periksa status pendaftaran secara berkala</li>
                                        <li>• Jika ada pertanyaan, hubungi admin sekolah</li>
                                        <li>• Data dapat diubah selama status masih "Menunggu Verifikasi"</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {application.status === 'accepted' && (
                    <Card className="border-green-200 bg-green-50">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🎊</span>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-green-800">Selamat! Pendaftaran Diterima</h3>
                                    <ul className="text-sm text-green-700 space-y-1">
                                        <li>• Tunggu informasi selanjutnya dari pihak sekolah</li>
                                        <li>• Pastikan nomor kontak tetap aktif</li>
                                        <li>• Siapkan dokumen-dokumen yang diperlukan</li>
                                        <li>• Ikuti instruksi registrasi ulang jika diminta</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {application.status === 'rejected' && (
                    <Card className="border-red-200 bg-red-50">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">📞</span>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-red-800">Informasi Lebih Lanjut</h3>
                                    <ul className="text-sm text-red-700 space-y-1">
                                        <li>• Hubungi pihak sekolah untuk informasi detail</li>
                                        <li>• Tanyakan kemungkinan pendaftaran ulang</li>
                                        <li>• Periksa persyaratan yang mungkin belum terpenuhi</li>
                                        <li>• Jangan berkecil hati, masih ada kesempatan lain</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}