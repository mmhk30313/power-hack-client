import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './layout.scss';
import DashNavigation from "./navigations/navigations";
interface LayoutProps {
    children?: React.ReactNode;
    pad?: boolean;
    btnRequest?: string;
    click?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, pad, btnRequest, click }) => {
    const [padding, setpadding] = useState(pad);
    const {login_logout_reducer} = useSelector((state: any) => state);
    // console.log({login_logout_reducer});
    const {name, email, imageUrl: avatar} = login_logout_reducer;
    useEffect(() => {
        setpadding(pad)

    }, [padding])
    return (
        <Fragment>
            <div className="layout-wrapper">
                <DashNavigation user={{name, email, avatar}}>
                    <div className="dashboard-layout">
                        {children}
                    </div>
                </DashNavigation>
            </div>

        </Fragment>
    )
}

export default Layout;