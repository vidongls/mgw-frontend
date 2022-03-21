import React from 'react';
import {Link} from "react-router-dom";

export const AccessDenied = () => {
    return (
        <div className="access-denied">
            <div className="body">
                <div className="container">
                    <div className="content">
                        <div className="title">Lỗi: 403</div>
                        <p className={'message'}>Bạn không có quyền truy cập nội dung này</p>
                        <Link to={'/'} className={'blue-link bold'}>Quay lại</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
