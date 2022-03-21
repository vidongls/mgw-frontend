import React, { useContext, useEffect } from "react"
import { Spin } from "antd"

import { useSearchParams } from "react-router-dom"
import appConfig from "../../Config/App"
import localStore from "../../Util/localStore"

export const Login = () => {
	const [searchParams] = useSearchParams()

    useEffect(() => {
        localStore.setItem('redirectBackUrl', searchParams.get('redirectBackUrl') || '/');

        setTimeout(() => {

            // @ts-ignore
            window.location.href = appConfig.loginUrl + '?redirect_uri=' + appConfig.authenticationUrl;
        }, 1000);
    })

	return (
		<div className={"mg-t-10 mg-l-10"}>
			Đang chuyển trang, vui lòng đợi một chút.... <Spin />
		</div>
	)
}
