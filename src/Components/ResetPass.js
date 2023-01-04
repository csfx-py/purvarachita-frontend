import { Lock, Send } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";

export default function ResetPass({ setComp }) {
  const { reset, getOtp } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [data, setData] = useState({
    email: "",
  });
  const [firstEdit, setFirstEdit] = useState({
    email: false,
  });

  const [passDisabled, setPassDisabled] = useState(true);

  const handleChange = (e) => {
    setFirstEdit({ ...firstEdit, [e.target.name]: true });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (data.email === "" || data.password === "") {
      enqueueSnackbar("Please fill all the fields");
      return false;
    }
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(data.email)) {
      enqueueSnackbar("Please enter a valid email");
      return false;
    }
    // password regex
    const passwordRegex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{6,20}/;
    if (!passwordRegex.test(data.password)) {
      enqueueSnackbar(
        "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter and one number"
      );
      return false;
    }
    if (!data.password === data.confirmPassword) {
      enqueueSnackbar("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleEmail = async (e) => {
    e.preventDefault();

    if (data.email === "") {
      enqueueSnackbar("Please fill the field");
      return false;
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(data.email)) {
      enqueueSnackbar("Please enter a valid email");
      return false;
    }

    const otp = await getOtp(data.email);

    if (otp.success) {
      enqueueSnackbar("Otp sent Successfully", { variant: "success" });
      setPassDisabled(false);
    } else {
      enqueueSnackbar(`Otp sending Failed ${otp.error.message}`, {
        variant: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3"
        align="center"
      >Work under progress</Typography>
      <Typography variant="h6">
        <Lock sx={{ mr: 1, verticalAlign: "middle" }} />
        Reset Password
      </Typography>
      <TextField
        variant="standard"
        disabled={true}
        placeholder="email"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
        type="email"
        name="email"
        value={data.email}
        error={
          firstEdit.email &&
          data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null
        }
        helperText={
          firstEdit.email &&
          data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null
            ? "Enter valid email"
            : ""
        }
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleEmail}
                aria-label="send otp"
                edge="end"
                disabled={true}
              >
                <Typography variant="body2" color="secondary">
                  Send OTP
                </Typography>
                <Send color="secondary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="standard"
        disabled={passDisabled}
        placeholder="Password"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={
          firstEdit.password &&
          // password with alphabets and special characters with length 6
          data.password.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
          ) === null
        }
        helperText={
          firstEdit.password &&
          data.password.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
          ) === null
            ? "Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 number"
            : ""
        }
      />
      <TextField
        variant="standard"
        disabled={passDisabled}
        placeholder="Confirm Password"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
        name="confirmPassword"
        type="password"
        value={data.confirmPassword}
        onChange={handleChange}
        error={
          firstEdit.confirmPassword && data.password !== data.confirmPassword
        }
        helperText={
          firstEdit.confirmPassword && data.password !== data.confirmPassword
            ? "Passwords do not match"
            : ""
        }
      />
      <Button
        variant="contained"
        disabled={passDisabled}
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
        onClick={handleSubmit}
        type="submit"
        color="secondary"
      >
        Submit
      </Button>
      <Typography variant="body2">
        Don't have an account?
        <Typography
          variant="body2"
          component="span"
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={() => setComp("reg")}
        >
          Register
        </Typography>
      </Typography>
    </form>
  );
}
