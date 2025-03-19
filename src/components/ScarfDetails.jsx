import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import Images from "@/components/Images";

import displayDecimal from "@/utils/displayDecimal";

const ScarfDetails = ({scarf, id, isListItem}) => {

	return (

		scarf && scarf.id ?

			<>
				{!isListItem ?
					<Grid size={12}>
						<h2>Jersey Details

						{scarf.ebayLink ?

							<>
								<a href={scarf.ebayLink} target="_blank" className="link">
									<Button
										variant="contained"
										color="info"
									>
										View on eBay
									</Button>

								</a>
							</>

						: null}

						</h2>

					</Grid>
				: null}

				<TableContainer className="jerseyDetailTable">
					<Table border={1}>
						<TableBody>

							<TableRow>
								<TableCell sx={{width: 125}}><strong>ID</strong></TableCell>
								<TableCell>{scarf.id}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><strong>Price </strong></TableCell>
								<TableCell>{scarf.price ? `$${displayDecimal(scarf.price, 0)} (or make offer)` : "(make offer)"} </TableCell>
							</TableRow>
							{scarf.sport ?
								<TableRow>
									<TableCell><strong>Sport</strong></TableCell>
									<TableCell>{scarf.sport}</TableCell>
								</TableRow>
							: null}
							{scarf.org ?
								<TableRow>
									<TableCell><strong>Organization</strong></TableCell>
									<TableCell>{scarf.org}</TableCell>
								</TableRow>
							: null}
							{scarf.team ?
								<TableRow>
									<TableCell><strong>Team</strong></TableCell>
									<TableCell>{scarf.team}</TableCell>
								</TableRow>
							: null}
							{scarf.league ?
								<TableRow>
									<TableCell><strong>League</strong></TableCell>
									<TableCell>{scarf.league}</TableCell>
								</TableRow>
							: null}
							{scarf.event ?
								<TableRow>
									<TableCell><strong>Event</strong></TableCell>
									<TableCell>{scarf.event}</TableCell>
								</TableRow>
							: null}
							{scarf.year ?
								<TableRow>
									<TableCell><strong>Year</strong></TableCell>
									<TableCell>{scarf.year}</TableCell>
								</TableRow>
							: null}
							{scarf.style ?
								<TableRow>
									<TableCell><strong>Style</strong></TableCell>
									<TableCell>{scarf.style}</TableCell>
								</TableRow>
							: null}
							{!isListItem ?
								<>
									<TableRow>
										<TableCell><strong>Notes</strong></TableCell>
										<TableCell>{scarf.sameOnBothSides ? "Same design on both sides." : ""} {scarf.notes}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><strong>Photos</strong><br/>(Click to enlarge in new window)</TableCell>
										<TableCell>
											<Images
												hasLink
												className="details scarves"
												id={scarf.id}
												show={scarf.photos}
												type="scarves"
											/>
										</TableCell>
									</TableRow>
								</>
							: null }
						</TableBody>

					</Table>
				</TableContainer>

			</>

		:

			<p>Scarf <strong>{id}</strong> not found</p>


	)

}

export default ScarfDetails;
