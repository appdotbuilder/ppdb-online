import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

interface Props {
    application: {
        id: number;
        student_name: string;
        birth_date: string;
        full_address: string;
        previous_school: string;
        parent_name: string;
        parent_contact: string;
        status: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Edit Pendaftaran', href: '#' },
];

export default function EditApplication({ application }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        student_name: application.student_name || '',
        birth_date: application.birth_date || '',
        full_address: application.full_address || '',
        previous_school: application.previous_school || '',
        parent_name: application.parent_name || '',
        parent_contact: application.parent_contact || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('applications.update', application.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Pendaftaran" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Pendaftaran</h1>
                        <p className="text-gray-600">Perbarui data pendaftaran Anda</p>
                    </div>
                </div>

                {/* Warning */}
                <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">⚠️</span>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-yellow-800">Perhatian!</h3>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• Pastikan data yang diperbarui sudah benar dan akurat</li>
                                    <li>• Data yang sudah diverifikasi tidak dapat diubah lagi</li>
                                    <li>• Perubahan data akan mengatur ulang status menjadi "Menunggu Verifikasi"</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Student Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                👤 Data Siswa
                            </CardTitle>
                            <CardDescription>
                                Perbarui informasi lengkap tentang calon siswa
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="student_name">Nama Lengkap Siswa *</Label>
                                <Input
                                    id="student_name"
                                    type="text"
                                    value={data.student_name}
                                    onChange={e => setData('student_name', e.target.value)}
                                    placeholder="Masukkan nama lengkap siswa"
                                    className={errors.student_name ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.student_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birth_date">Tanggal Lahir *</Label>
                                <Input
                                    id="birth_date"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={e => setData('birth_date', e.target.value)}
                                    className={errors.birth_date ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.birth_date} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="full_address">Alamat Lengkap *</Label>
                                <Textarea
                                    id="full_address"
                                    value={data.full_address}
                                    onChange={e => setData('full_address', e.target.value)}
                                    placeholder="Masukkan alamat lengkap siswa (RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten)"
                                    rows={4}
                                    className={errors.full_address ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.full_address} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="previous_school">Asal Sekolah *</Label>
                                <Input
                                    id="previous_school"
                                    type="text"
                                    value={data.previous_school}
                                    onChange={e => setData('previous_school', e.target.value)}
                                    placeholder="Nama sekolah asal (SD/SMP/SMA)"
                                    className={errors.previous_school ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.previous_school} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Parent Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                👨‍👩‍👧‍👦 Data Orang Tua/Wali
                            </CardTitle>
                            <CardDescription>
                                Perbarui informasi kontak orang tua atau wali siswa
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="parent_name">Nama Orang Tua/Wali *</Label>
                                <Input
                                    id="parent_name"
                                    type="text"
                                    value={data.parent_name}
                                    onChange={e => setData('parent_name', e.target.value)}
                                    placeholder="Nama lengkap orang tua atau wali"
                                    className={errors.parent_name ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.parent_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="parent_contact">Nomor Kontak *</Label>
                                <Input
                                    id="parent_contact"
                                    type="text"
                                    value={data.parent_contact}
                                    onChange={e => setData('parent_contact', e.target.value)}
                                    placeholder="Nomor HP atau telepon yang dapat dihubungi"
                                    className={errors.parent_contact ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.parent_contact} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get(route('applications.show', application.id))}
                            disabled={processing}
                        >
                            Batal
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="flex-1"
                        >
                            {processing ? 'Menyimpan...' : '💾 Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}