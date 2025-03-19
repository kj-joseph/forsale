import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid2";

import Images from "@/components/Images";
import ScarfDetails from "@/components/ScarfDetails";
import { SiteTheme } from "@/components/SiteTheme";

import { getScarfList } from "@/services/itemService";

import "@/style/main.scss";

const ItemList = (props) => {

	const [currentDialog, setCurrentDialog] = useState(null);

	const [scarfList, _setScarfList] = useState([]);

	const scarfListRef = useRef(scarfList);
	const setScafList = (data) => {
		scarfListRef.current = data;
		_setScarfList(data);
	}

	const { itemId } = useParams();

	useEffect(() => {
		openDialog("loading");
		Promise.all([
			loadScarfList(),
		])
			.then((loadedScarfList) => {
				closeDialog();
			})
			.catch((error) => {
				console.error(error);
				closeDialog();
			});

	}, []);

	const loadScarfList = async () => {

		getScarfList()
			.then((loadedScarfList) => {
				setScafList(loadedScarfList);
			})
			.catch((error) => {
				console.error(error);
				openSnackbar("Error getting tier list from sheets");
			});

	}

	const getSingleScarf = id => {
		const scarfFilter = scarfListRef.current.filter(scarf => scarf.id === id);
		if (scarfFilter.length === 1) {
			return scarfFilter[0];
		} else {
			return {};
		}
	}

	const openDialog = (dialog) => {
		setCurrentDialog(dialog);
	}

	const closeDialog = (event, reason) => {
		setCurrentDialog(null);
	}

	return (

		<SiteTheme>

				<Dialog
				open={currentDialog === "loading"}
				onClose={closeDialog}
			>
				<DialogContent>
					<p>Loading...</p>
				</DialogContent>
			</Dialog>

			{scarfListRef.current.length ?

				<Grid container size={12}>

					<Grid size={12}>

						{itemId ?

							<Grid size={12}>

								<Grid size={12} padding={2}>
									<Link to="/scarves">
										<Button variant="contained">
											Back to scarf list
										</Button>
									</Link>
								</Grid>

								<Grid size={12} container padding={2}>

									<ScarfDetails
										scarf={getSingleScarf(itemId)}
										id={itemId}
									/>

								</Grid>

							</Grid>

						:

							<>

								<Grid size={12} padding={2}>

									<Link to="/jerseys">
										<Button variant="contained">
											Go to Jerseys
										</Button>
									</Link>

								</Grid>

								<Grid size={12} padding={0}>

									<Grid container size={12} justifyContent="center">
										<h1>Scarves for sale</h1>
									</Grid>

									<Grid container size={12} justifyContent="center" marginTop={-2}>
										<p>(More coming soon)</p>
									</Grid>

									<Grid container size={12} justifyContent={"space-around"}>

										{scarfListRef.current
											.filter(scarf => ["paid", "postage", "shipped", "reserved"].indexOf(scarf.status) === -1)
											.sort((a, b) => a.team < b.team ? -1 : a.team > b.team ? 1 :
												a.season < b.season ? -1 : a.season > b.season ? 1 : 0)
											.map((scarf, index) =>
												<Grid key={index} container size={{xs: 12, lg: 5}}
													justifyContent={"space-between"}
													padding={2} border={2} margin={2}
												>

													<Grid size={{xs: 12, lg: 7}} marginTop={-2}>
														<ScarfDetails
															isListItem
															id={itemId}
															scarf={scarf}
														/>
													</Grid>

													<Grid size={{xs: 12, lg: 4}}
														justifyItems={{xs: "center", lg: "end"}}
														paddingTop={{xs: 2, lg: 0}}
													>
														<Link to={`/scarves/${scarf.id}`}>
															<Button variant="contained">
																More details
															</Button>
														</Link>
														<Images
															hasLink
															className="thumbnails scarves"
															id={scarf.id}
															show={scarf.photos === 1 ? 1 : 2}
															type="scarves"
														/>
														<div><br/>(Click photo to enlarge in new window)</div>
													</Grid>

												</Grid>
											)}

									</Grid>

								</Grid>

							</>

						}

					</Grid>

				</Grid>

			: null }

		</SiteTheme>


	)

}

export default ItemList;
