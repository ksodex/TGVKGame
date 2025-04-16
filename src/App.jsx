
import React, { Suspense, lazy } from "react"

import { SplitLayout, ConfigProvider, usePlatform, ScreenSpinner } from "@vkontakte/vkui"
import { Epic, Panel, View, useRouterPopout } from "@kokateam/router-vkminiapps"
import { useSnackbar } from "./hooks/useSnackbar"
import { useModal } from "./hooks/useModal"
import { useRecoilState } from "recoil"

const MainPage = lazy(() => import("./pages/main.jsx"))
const AboutPage = lazy(() => import("./pages/about.jsx"))
const RatingPage = lazy(() => import("./pages/rating.jsx"))
const MemoryGame = lazy(() => import("./pages/memory.jsx"))
const AnagramsGame = lazy(() => import("./pages/anagrams.jsx"))
const AnagramsInfo = lazy(() => import("./pages/info/anagrams.jsx"))
const MemoryInfo = lazy(() => import("./pages/info/memory.jsx"))

const App = () => {
    const [modal] = useRecoilState(useModal)
    const [snackbar] = useSnackbar()
    const platform = usePlatform()
    const [popout] = useRouterPopout(<ScreenSpinner size="large" />)

    return <ConfigProvider platform={platform} appearance="light">
        <SplitLayout popout={popout}>
            <Epic>
                <View id="mainviewws">
                    <Panel id="main">
                        <Suspense fallback={<ScreenSpinner />}>
                            <MainPage />
                        </Suspense>
                    </Panel>

                    <Panel id="rating">
                        <Suspense fallback={<ScreenSpinner />}>
                            <RatingPage />
                        </Suspense>
                    </Panel>

                    <Panel id="about">
                        <Suspense fallback={<ScreenSpinner />}>
                            <AboutPage />
                        </Suspense>
                    </Panel>

                    <Panel id="anagramsInfo">
                        <Suspense fallback={<ScreenSpinner />}>
                            <AnagramsInfo />
                        </Suspense>
                    </Panel>

                    <Panel id="memoryInfo">
                        <Suspense fallback={<ScreenSpinner />}>
                            <MemoryInfo />
                        </Suspense>
                    </Panel>

                    <Panel id="anagrams">
                        <Suspense fallback={<ScreenSpinner />}>
                            <AnagramsGame />
                        </Suspense>
                    </Panel>

                    <Panel id="memory">
                        <Suspense fallback={<ScreenSpinner />}>
                            <MemoryGame />
                        </Suspense>
                    </Panel>
                </View>
            </Epic>
        </SplitLayout>
        {modal}
        {snackbar}
    </ConfigProvider>
}

export default App
