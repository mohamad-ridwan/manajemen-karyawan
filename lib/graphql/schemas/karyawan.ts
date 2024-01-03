import { DocumentNode, gql } from "@apollo/client";

const postKaryawan = (
    query: string[]
): DocumentNode => gql`
query PostKaryawan($postKaryawanId: String!, $jabatan: String!, $nik: String!, $alamat: String!, $noTelp: String!, $tglLahir: String!, $divisi: String!, $gaji: String!, $statusKaryawan: String!, $tglBergabung: String!) {
  postKaryawan(id: $postKaryawanId, jabatan: $jabatan, NIK: $nik, alamat: $alamat, noTelp: $noTelp, tglLahir: $tglLahir, divisi: $divisi, gaji: $gaji, statusKaryawan: $statusKaryawan, tglBergabung: $tglBergabung) {
    data {
      ${query.join(' ')}
    }
  }
}
`

export const karyawanSchemas = {
    postKaryawan
}