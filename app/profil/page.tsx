import Container from "@/components/Container";
import WrapProfilInfo from "./(ProfilInfo)/WrapProfilInfo";
import { classModalIcon, customAlertFailure, customButtonDefault, customInput } from "@/components/CustomTheme";
import LoadingBtn from "@/components/Loaders/LoadingBtn";

export const dynamic = "force-dynamic";

export default function Profil() {
    return (
        <Container>
            <WrapProfilInfo
                customAlertFailure={customAlertFailure}
                customButtonDefault={customButtonDefault}
                customInput={customInput}
                classModalIcon={classModalIcon}
                loadingBtn={<LoadingBtn color="info" />}
            />
        </Container>
    )
}