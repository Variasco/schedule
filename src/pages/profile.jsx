import { useContext, useEffect, useState } from "react";
import { MyButton, MyInput } from "../components/UI";
import { AuthContext } from "../context";

export const Profile = () => {
    const [isChanging, setChanging] = useState(false);
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
    });

    const { user: userFromBD } = useContext(AuthContext);

    const getUser = () => {
        setUser({
            ...user,
            email: userFromBD.email,
            name: userFromBD.displayName?.split(" ")[0],
            surname: userFromBD.displayName?.split(" ")[1],
            phone: userFromBD.phoneNumber,
        });
    };

    const saveChanges = () => {
        setChanging(false);
    };

    useEffect(() => {
        getUser();
    }, []);

    return !isChanging ? (
        <div className="profile-container">
            <h1 className="profile-header">Профиль</h1>
            <div className="profile-lineblock">
                <p className="profile-property">{user.name || ""}</p>
            </div>
            <div className="profile-lineblock">
                <p className="profile-property">{user.surname || ""}</p>
            </div>
            <div className="profile-lineblock">
                <p className="profile-property">{user.email || ""}</p>
            </div>
            <div className="profile-lineblock">
                <p className="profile-property">{user.phone || ""}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <MyButton
                    onClick={() => {
                        setChanging(true);
                    }}
                    style={{ margin: "0 auto", fontSize: "20px" }}
                >
                    Изменить
                </MyButton>
            </div>
        </div>
    ) : (
        <div className="profile-container">
            <h1 className="profile-header">Профиль</h1>
            <div className="profile-lineblock">
                <MyInput
                    value={user.name}
                    onChange={(e) => {
                        setUser({ ...user, name: e.target.value });
                    }}
                ></MyInput>
            </div>
            <div className="profile-lineblock">
                <p className="profile-property">Фамилия</p>
            </div>
            <div className="profile-lineblock">
                <p className="profile-property">e-mail</p>
            </div>
            <div className="profile-lineblock">
                <p className="profile-property">Телефон</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <MyButton
                    onClick={saveChanges}
                    style={{ margin: "0 auto", fontSize: "20px" }}
                >
                    Сохранить
                </MyButton>
            </div>
        </div>
    );
};
