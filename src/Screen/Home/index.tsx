import React from 'react';
import DefaultLayout from '../../Component/Layout/Default';

export const Home = (props: any) => {
    return (
        <DefaultLayout
            {...props}
            loading={false}
            title={"Bảng điều khiển"}
        >
            <div className="main-content">
                <div className="white-box white-box--padding-15px">
                    <div>Bảng điều khiển</div>
                </div>
            </div>
        </DefaultLayout>
    );
}
