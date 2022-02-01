/* eslint-disable prettier/prettier */
import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {
    return (
        <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
                <Switch>
                    {routes.map((route, idx) => {
                        return (
                            route.component && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={(props) =>
                                        localStorage.getItem("userAuth") !== null
                                            ? (
                                                <route.component {...props} />
                                            ) : (
                                                <Redirect to={{ pathname: "/login" }} />
                                            )
                                        //      (
                                        //     <>
                                        //       <route.component {...props} />
                                        //     </>
                                        //   )
                                    }
                                />
                            )
                        )
                    })}
                    <Redirect from="/" to="/dashboard" />
                </Switch>
            </Suspense>
        </CContainer>
    )
}

export default React.memo(AppContent)
