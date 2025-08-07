import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Application {
    id: number;
    student_name: string;
    birth_date: string;
    previous_school: string;
    parent_name: string;
    parent_contact: string;
    status: 'pending' | 'accepted' | 'rejected';
    status_display: string;
    status_badge_color: string;
    created_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface Props {
    applications: {
        data: Application[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kelola Pendaftaran', href: '/applications' },
];

export default function ApplicationsList({ applications }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'accepted':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleViewDetails = (applicationId: number) => {
        router.get(route('applications.show', applicationId));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Pendaftaran" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Kelola Pendaftaran</h1>
                        <p className="text-gray-600">Daftar semua pendaftaran peserta didik baru</p>
                    </div>
                    <div className="text-sm text-gray-500">
                        Total: {applications.total} pendaftar
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Menunggu Verifikasi</p>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {applications.data.filter(app => app.status === 'pending').length}
                                    </p>
                                </div>
                                <span className="text-2xl">⏳</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Diterima</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {applications.data.filter(app => app.status === 'accepted').length}
                                    </p>
                                </div>
                                <span className="text-2xl">✅</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Ditolak</p>
                                    <p className="text-2xl font-bold text-red-600">
                                        {applications.data.filter(app => app.status === 'rejected').length}
                                    </p>
                                </div>
                                <span className="text-2xl">❌</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {applications.data.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center py-8">
                                <span className="text-4xl">📝</span>
                                <h3 className="text-lg font-semibold mt-4">Belum Ada Pendaftaran</h3>
                                <p className="text-gray-600 mt-2">Saat ini belum ada pendaftaran peserta didik baru.</p>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Pendaftaran</CardTitle>
                            <CardDescription>
                                Klik pada baris untuk melihat detail dan mengelola status pendaftaran
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-2 font-medium">Nama Siswa</th>
                                            <th className="text-left p-2 font-medium">Nama Orang Tua</th>
                                            <th className="text-left p-2 font-medium">Asal Sekolah</th>
                                            <th className="text-left p-2 font-medium">Kontak</th>
                                            <th className="text-left p-2 font-medium">Status</th>
                                            <th className="text-left p-2 font-medium">Tgl Daftar</th>
                                            <th className="text-left p-2 font-medium">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.data.map((application) => (
                                            <tr 
                                                key={application.id}
                                                className="border-b hover:bg-gray-50 cursor-pointer"
                                                onClick={() => handleViewDetails(application.id)}
                                            >
                                                <td className="p-2">
                                                    <div>
                                                        <div className="font-medium">{application.student_name}</div>
                                                        <div className="text-sm text-gray-500">{application.user.email}</div>
                                                    </div>
                                                </td>
                                                <td className="p-2">{application.parent_name}</td>
                                                <td className="p-2">{application.previous_school}</td>
                                                <td className="p-2">{application.parent_contact}</td>
                                                <td className="p-2">
                                                    <Badge className={getStatusColor(application.status)}>
                                                        {application.status_display}
                                                    </Badge>
                                                </td>
                                                <td className="p-2 text-sm text-gray-600">
                                                    {formatDate(application.created_at)}
                                                </td>
                                                <td className="p-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleViewDetails(application.id);
                                                        }}
                                                    >
                                                        Detail
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Info */}
                            {applications.last_page > 1 && (
                                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                                    <div>
                                        Menampilkan {((applications.current_page - 1) * applications.per_page) + 1} - {Math.min(applications.current_page * applications.per_page, applications.total)} dari {applications.total} pendaftar
                                    </div>
                                    <div>
                                        Halaman {applications.current_page} dari {applications.last_page}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}