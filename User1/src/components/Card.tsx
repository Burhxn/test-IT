import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";
import { Avatar, CardHeader, Divider, IconButton, Tooltip } from "@mui/material";
import { Call, MailOutline, Place, Visibility } from "@mui/icons-material";
import CardContentBox from "./sharedcomponents/CardContent";

export default function ImgMediaCard() {
  const [users, setUsers] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6; 

  const fetchUsers = async () => {
    const res = await axios.get("https://dummyjson.com/users");
    setUsers(res.data.users);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          background: "#DBEBEF",
          padding: "10px",
          justifyContent: "center",
        }}
      >
        {currentUsers.map((u) => (
          <div
            key={u.id}
            style={{
              margin: "10px",
              maxWidth: "24rem",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "1rem",
              backgroundColor: "#F5FAFC",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card sx={{ maxWidth: 400 }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={u.image}
                    sx={{
                      width: 56,
                      height: 56,
                      padding: 1,
                      border: `1px solid #e1dede`,
                    }}
                  />
                }
                title={`${u.firstName} ${u.lastName}`}
                subheader={u.company?.title}
              />
              <Divider style={{ width: "90%", margin: "auto" }} />
              <CardContent style={{ paddingTop: 10, paddingBottom: 0 }}>
                <CardContentBox icon={MailOutline} text={u.email} />
                <CardContentBox icon={Call} text={u.phone} />
                <CardContentBox icon={Place} text={u.address.address} />
              </CardContent>
              <CardActions>
                <IconButton aria-label="view detail">
                  <Tooltip title="Click to view details">
                    <Visibility />
                  </Tooltip>
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>

      
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "contained" : "outlined"}
            onClick={() => setCurrentPage(index + 1)}
            style={{ margin: "0 5px" }}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          variant="outlined"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
