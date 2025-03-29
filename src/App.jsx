
import React, { Suspense, lazy } from "react"

import { SplitLayout, ConfigProvider, usePlatform, ScreenSpinner } from "@vkontakte/vkui"
import { Epic, Panel, View, useRouterPopout } from "@kokateam/router-vkminiapps"
import { useSnackbar } from "./hooks/useSnackbar"
import { useModal } from "./hooks/useModal"
import { useRecoilState } from "recoil"

// import { itemsLink } from "./vendor/gameLink"

const MainPage = lazy(() => import("./pages/main.jsx"))
const RatingPage = lazy(() => import("./pages/rating.jsx"))
const MemoryGame = lazy(() => import("./pages/memoryGame.jsx"))

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

                    {/* <Panel id="continue-history">
                        <Suspense fallback={<ScreenSpinner />}>
                            <GameLayout gameName={"Мемори"} target={<Memory />} />
                        </Suspense>
                    </Panel> */}
                    {/* <Panel id="continue-word">
                        <Suspense fallback={<ScreenSpinner />}>
                            <GameLayout gameName={"Мемори"} target={<>iwobdiwoqbdoibwqio</>} />
                        </Suspense>
                    </Panel> */}

                    {/* <Panel id="history-event">
                        <Suspense fallback={<ScreenSpinner />}>
                            <GameLayout gameName={"Мемори"} target={<>iwobdiwoqbdoibwqio</>} />
                        </Suspense>
                    </Panel>
                    <Panel id="categoryes">
                        <Suspense fallback={<ScreenSpinner />}>
                            <GameLayout gameName={"Мемори"} target={<>iwobdiwoqbdoibwqio</>} />
                        </Suspense>
                    </Panel> */}

                    {/* <Panel id="word-bot">
                        <Suspense fallback={<ScreenSpinner />}>
                            <GameLayout gameName={"Мемори"} target={<>word-bot</>} />
                        </Suspense>
                    </Panel> */}
                    <Panel id="memory">
                        <Suspense fallback={<ScreenSpinner />}>
                            <MemoryGame />
                        </Suspense>
                    </Panel>
                    {/* <Panel id="test">
                        <Suspense fallback={<ScreenSpinner />}>
                            <GameLayout gameName={"Мемори"} target={<>iwobdiwoqbdoibwqio</>} />
                        </Suspense>
                    </Panel> */}





                </View>
            </Epic>
        </SplitLayout>
        {modal}
        {snackbar}
    </ConfigProvider>
}

export default App
