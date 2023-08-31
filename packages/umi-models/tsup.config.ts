import { defineConfig } from 'tsup';
import { lessLoader } from 'esbuild-plugin-less';

export default defineConfig({
	esbuildPlugins: [lessLoader()],
});
