const path=globalThis.location?.pathname||'/';
export const IS_PREVIEW=path.split('/').includes('preview')||globalThis.document?.querySelector('meta[name="gymbro-environment"]')?.content==='preview';
export const DATABASE_NAME=IS_PREVIEW?'gymbro-preview-v1':'gymbro-local';
export const WRITER_LOCK=IS_PREVIEW?'gymbro-preview-writer':'gymbro-writer';
