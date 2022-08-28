import { S3 } from '@aws-sdk/client-s3';

export const s3Client = new S3({
	endpoint: import.meta.env.VITE_DO_SPACES_URL as string,
	region: 'us-east-1',
	credentials: {
		accessKeyId: import.meta.env.VITE_DO_SPACES_ID as string,
		secretAccessKey: import.meta.env.VITE_DO_SPACES_SECRET as string
	}
});
