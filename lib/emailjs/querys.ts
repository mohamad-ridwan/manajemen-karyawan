const verifikasi = {
    serviceID: process.env.NEXT_PUBLIC_SERVICE_ID_VERIFIKASI as string,
    templateID: process.env.NEXT_PUBLIC_TEMPLATE_ID_VERIFIKASI as string,
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY_VERIFIKASI as string,
}

export const queryEmailjs = {
    verifikasi
}