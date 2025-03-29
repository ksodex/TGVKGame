import { viteSingleFile } from "vite-plugin-singlefile"
import { terser } from "rollup-plugin-terser"
import { defineConfig, loadEnv } from "vite"

import compressDist from "rollup-plugin-compress-dist"
import react from "@vitejs/plugin-react-swc"
import mkcert from "vite-plugin-mkcert"
import svgr from "vite-plugin-svgr"
import tailwindcss from "@tailwindcss/vite"

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    return defineConfig({
        server: { https: true },
        plugins: [
            react(),
            process?.env?.ODR ? viteSingleFile() : null,
            svgr(),
            mkcert(),
            tailwindcss()
        ],

        build: {
            chunkSizeWarningLimit: 1000,
            sourcemap: false,
            outDir: "build",
            rollupOptions: {
                plugins: [
                    terser({
                        format: {
                            comments: false
                        }
                    }),
                    // compressDist({
                    //     type: "zip",
                    //     archiverName: "build.zip",
                    //     sourceName: "build"
                    // })
                ]
            }
        }
    })
}
