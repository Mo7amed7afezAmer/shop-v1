import { TextField } from "@material-ui/core";
import { Telegram, Facebook } from "@material-ui/icons";

const Dashboard = () => {
    return (
        <>
            <div>Dashboard</div>
            <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <Telegram />
            <Facebook />
        </>
    )
}

export default Dashboard;