import React from "react"

import "@vkontakte/vkui/dist/vkui.css"
import "./style.css"

import axios from "axios"
import eruda from "eruda"
import App from "./App"

import { AdaptivityProvider, AppRoot } from "@vkontakte/vkui"
import { RouterRoot } from "@kokateam/router-vkminiapps"
import { createRoot } from "react-dom/client"
import { version } from "../package.json"

import {
    defineEventHandlers,
    init,
    retrieveLaunchParams,
    miniAppReady,
    mockTelegramEnv,
    parseInitData,
    setMiniAppBottomBarColor,
    setMiniAppHeaderColor,
    setMiniAppBackgroundColor,
    mountMiniApp,
} from "@telegram-apps/sdk"

eruda.init()

axios.defaults.baseURL = "https://app-backend.csio-dpo.ru"

const initializeTelegramSDK = async () => {
    try {
        /*// Попытка инициализировать настоящее окружение Telegram
        console.log("Инициализация окружения Telegram")
        const [miniApp] = initMiniApp()
        await miniApp.ready()*/

        init({})
        miniAppReady()
        defineEventHandlers()
        mountMiniApp()
        // setMiniAppBottomBarColor("#16161d")
        // setMiniAppHeaderColor("#16161d")
        // setMiniAppBackgroundColor("#16161d")
    } catch (error) {
        // В случае ошибки инициализируем фейковое окружение
        console.error("Ошибка при инициализации Telegram:", error)

        const initDataRaw = new URLSearchParams([
            [
                "user",
                JSON.stringify({
                    id: 99281932,
                    first_name: "Andrew",
                    last_name: "Rogue",
                    username: "rogue",
                    language_code: "en",
                    is_premium: true,
                    allows_write_to_pm: true,
                }),
            ],
            [
                "hash",
                "89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31",
            ],
            ["auth_date", "1716922846"],
            ["start_param", "debug"],
            ["chat_type", "sender"],
            ["chat_instance", "8428209589180549439"],
        ]).toString()

        mockTelegramEnv({
            // themeParams: {
            //     accentTextColor: "#6ab2f2",
            //     bgColor: "#17212b",
            //     buttonColor: "#5288c1",
            //     buttonTextColor: "#ffffff",
            //     destructiveTextColor: "#ec3942",
            //     headerBgColor: "#fcb69f",
            //     hintColor: "#708499",
            //     linkColor: "#6ab3f3",
            //     secondaryBgColor: "#232e3c",
            //     sectionBgColor: "#17212b",
            //     sectionHeaderTextColor: "#6ab3f3",
            //     subtitleTextColor: "#708499",
            //     textColor: "#f5f5f5",
            // },
            initData: parseInitData(initDataRaw),
            initDataRaw,
            version: "7.2",
            platform: "tdesktop"
        })

        console.log("Mock Telegram environment initialized")
    } finally {
        const raw = decodeURIComponent(window.location.href)
            .split("#tgWebAppData=")[1]
            .split("&tgWebAppVersion")[0]
        console.log("Init data params", raw)

        axios.defaults.headers["user"] = raw
        axios.defaults.headers["tg_init_data"] = raw
        axios.defaults.headers["Content-Type"] = "application/json"
    }
}

initializeTelegramSDK()

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
    <AdaptivityProvider>
        <AppRoot>
            <RouterRoot>
                <App />
            </RouterRoot>
        </AppRoot>
    </AdaptivityProvider>
)

const snippets = eruda.get("snippets")
snippets.clear()
snippets.add(
    "show launch params",
    () => {
        console.log(document.location.href)
    },
    "Выводит параметры запуска в консоль (Console)."
)
const info = eruda.get("info")
info.add("Version app", version)
