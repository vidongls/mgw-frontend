import React, {useEffect, useState} from 'react'
import * as queryString from "query-string";

import lodash from "lodash";
import axios from "axios";
import appConfig from "../../Config/App";
import loadingGif from '../../resources/images/loading.gif'
import errorPng from '../../resources/images/error.png'
import DocumentTitle from "react-document-title";
import localStore from '../../Util/localStore';

export const Authentication = () => {
    const locationHash = window.location.hash;
    const params: any = queryString.parse(locationHash.substring(1));
    const [isNotPermission, setIsNotPermission] = useState(false)
    const [msg, setMsg] = useState('Đang kiểm tra xác thực, vui lòng đợi')

    // reset loginSession
    localStore.setItem('loginSession', '/');

    useEffect(() => {
        if (lodash.has(params, 'access_token')) {
            setMsg("Bạn sẽ được chuyển đến Bảng điều khiển ngay bây giờ")
        }
        else {
            setIsNotPermission(true)
            setMsg("Không thể đăng nhập")
        }

        const redirectBackUrl = localStore.getItem('redirectBackUrl') ? localStore.getItem('redirectBackUrl') : '/';
        axios({
            url: appConfig.apiUrl + '/profile',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + params['access_token']
            }
        })
            .then((response) => {
                localStore.setJson('loginSession', {
                    accessToken: params['access_token'],
                    expireAt: params['expire_at']
                });
                localStore.setJson('loggedUser', response.data);
                setTimeout(()=> {
                    // @ts-ignore
                    window.location.href = redirectBackUrl;
                }, 1000);
            })
            .catch(error => {
                localStore.removeItem('loginSession');
                localStore.removeItem('loggedUser');
                setIsNotPermission(true)
                setMsg(lodash.get(error, 'response.data.message'))
            });
        // eslint-disable-next-line
    }, [])

    return(
        <DocumentTitle title={`Xác thực`}>
            <div className={'splash-container'}>

                {
                    !isNotPermission
                    ?
                    <div className={'text-center margin-auto'}>
                        <img src={loadingGif} alt={""}/>
                        <p className="splash-text txt-color-black2 mgt25">
                            {msg}
                        </p>
                    </div>
                    :
                    <div className={'text-center margin-auto'}>
                        <div>
                            <img src={errorPng} alt={""}/>
                        </div>
                        <div className="txt-center">
                            <p className="splash-text txt-color-black2 mgt20">
                                Không thể xác thực
                            </p>
                            <p className="splash-text txt-color-black2 mgt20">
                                Vui lòng liên hệ với Admin
                            </p>
                            <div className={'mgt50'}>
                                <a href="/" className="splash-text txt-color-blue2 mg-r-20">
                                    <i className="fas fa-undo-alt mgr5"/> <span>Thử lại</span>
                                </a>
                            </div>

                        </div>
                    </div>
                }
            </div>
        </DocumentTitle>
    );
}
