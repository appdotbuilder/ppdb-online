import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: 'applicant' | 'admin';
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="PPDB Online - Sistem Pendaftaran Peserta Didik Baru" />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-600 text-white p-2 rounded-lg">
                                    🏫
                                </div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    PPDB Online
                                </h1>
                            </div>
                            <div className="flex space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            🎓 Penerimaan Peserta Didik Baru
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Sistem pendaftaran online yang mudah, cepat, dan aman untuk calon siswa baru. 
                            Daftar sekarang dan pantau status pendaftaran Anda secara real-time.
                        </p>
                        
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href={route('register')}>
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                                        🚀 Mulai Pendaftaran
                                    </Button>
                                </Link>
                                <Link href={route('login')}>
                                    <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                                        👤 Masuk Akun
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-lg font-semibold mb-2">Formulir Online</h3>
                            <p className="text-gray-600">
                                Isi formulir pendaftaran lengkap dengan data siswa dan orang tua
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-lg font-semibold mb-2">Status Real-time</h3>
                            <p className="text-gray-600">
                                Pantau status pendaftaran Anda secara langsung dan real-time
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-lg font-semibold mb-2">Aman & Terpercaya</h3>
                            <p className="text-gray-600">
                                Data Anda dijamin aman dengan sistem keamanan terdepan
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-lg font-semibold mb-2">Proses Cepat</h3>
                            <p className="text-gray-600">
                                Verifikasi dan pengumuman hasil dilakukan dengan cepat
                            </p>
                        </div>
                    </div>

                    {/* Process Steps */}
                    <div className="bg-white rounded-xl shadow-sm border p-8 mb-16">
                        <h3 className="text-2xl font-bold text-center mb-8">Alur Pendaftaran</h3>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    1
                                </div>
                                <h4 className="font-semibold mb-2">Buat Akun</h4>
                                <p className="text-sm text-gray-600">Daftar dan verifikasi akun Anda</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    2
                                </div>
                                <h4 className="font-semibold mb-2">Isi Formulir</h4>
                                <p className="text-sm text-gray-600">Lengkapi data siswa dan orang tua</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    3
                                </div>
                                <h4 className="font-semibold mb-2">Verifikasi</h4>
                                <p className="text-sm text-gray-600">Tunggu proses verifikasi admin</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    4
                                </div>
                                <h4 className="font-semibold mb-2">Pengumuman</h4>
                                <p className="text-sm text-gray-600">Terima hasil keputusan pendaftaran</p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    {!auth.user && (
                        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
                            <h3 className="text-2xl font-bold mb-4">Siap Memulai Pendaftaran?</h3>
                            <p className="text-blue-100 mb-6">
                                Bergabunglah dengan ribuan siswa yang telah mempercayai sistem PPDB Online kami
                            </p>
                            <Link href={route('register')}>
                                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                                    Daftar Sekarang 🎯
                                </Button>
                            </Link>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-gray-400">
                            © 2024 PPDB Online. Sistem Penerimaan Peserta Didik Baru.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}