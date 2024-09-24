import React from 'react';
import NavbarComponent from '../Component/NavbarComponent';

function AboutPage() {
  return (
    <>
      <NavbarComponent />
      <div className="container mx-auto p-4 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center mb-4 text-orange-500 dark:text-orange-300">Tentang ReteFlix</h1>
        <p className="text-lg mb-4 text-gray-600 dark:text-gray-400">
          ReteFlix adalah aplikasi pencarian film yang memungkinkan pengguna untuk menjelajahi database film yang luas. Apakah Anda mencari film terbaru atau favorit klasik, ReteFlix menyediakan antarmuka yang intuitif untuk menemukan informasi tentang film favorit Anda.
        </p>
        <p className="text-lg mb-4 text-gray-600 dark:text-gray-400">
          Aplikasi kami menggunakan API TMDB (The Movie Database) untuk mengambil data film, termasuk judul, poster, dan deskripsi. Dengan fitur pencarian yang sederhana, Anda dapat dengan cepat menemukan film yang sesuai dengan minat Anda.
        </p>
        <h2 className="text-2xl font-semibold mb-2 text-blue-500 dark:text-blue-300">Fitur</h2>
        <ul className="list-disc list-inside mb-4 text-gray-600 dark:text-gray-400">
          <li>Cari film berdasarkan judul</li>
          <li>Lihat poster dan detail film</li>
          <li>Tukar antara mode terang dan gelap untuk pengalaman yang lebih personal</li>
        </ul>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Terima kasih telah mengunjungi ReteFlix! Kami berharap Anda menikmati menjelajahi dunia film.
        </p>
      </div>
    </>
  );
}

export default AboutPage;