import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";

import { SiteTheme } from "@/components/SiteTheme";

import "@/style/main.scss";

const Home = () => {

	let navigate = useNavigate();

	return (

		<SiteTheme>

				<Grid container size={12}>

					<Grid size={12}>

						<Grid size={12} padding={2} className="bigButtons" justifyItems="center">
							<Button
								variant="contained"
								onClick={() => navigate("/jerseys")}
							>
								Jerseys
							</Button>
							<Button
								variant="contained"
								onClick={() => navigate("/scarves")}
								disabled
							>
								Scarves
							</Button>
							<p>(scarves coming soon)</p>
						</Grid>


					</Grid>

				</Grid>

		</SiteTheme>


	)

}

export default Home;
