import downloadFile from './downloadFile';
import getAssetList from './getAssetList';

export const downloadAllFiles = async () => {
	const fileList = await getAssetList();
	for (const file of fileList) {
		try {
			await downloadFile(file);
		} catch (error) {
			console.log(`error downloading ${file.filename_disk}`, error);
		}
	}
};
