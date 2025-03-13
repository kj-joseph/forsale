import { callGoogleSheets } from "@/services/googleSheetsService";

export const getJerseyList = async () =>

	new Promise((resolve, reject) => {

		callGoogleSheets("jerseys", {})
			.then((response) =>
				resolve(response
					.filter(jersey => !!jersey.id)
					.map(jersey => ({
						id: jersey.id,
						ebayLink: jersey.ebayLink,
						league: jersey.league,
						manufacturer: jersey.manufacturer,
						name: jersey.name,
						notes: jersey.notes,
						number: jersey.number,
						photos: Number(jersey.photos),
						price: jersey.price,
						season: jersey.season,
						size: jersey.size,
						sold: jersey.sold === "TRUE",
						sport: jersey.sport,
						team: jersey.team,
						type: jersey.type,
				})))
			)

			.catch((error) =>
				reject(error));

	});

	export const getScarfList = async () =>

		new Promise((resolve, reject) => {

			callGoogleSheets("scarves", {})
				.then((response) =>
					resolve(response
						.filter(jersey => !!jersey.id)
						.map(jersey => ({
							id: jersey.id,
							ebayLink: jersey.ebayLink,
							event: jersey.event,
							league: jersey.league,
							notes: jersey.notes,
							org: jersey.org,
							photos: Number(jersey.photos),
							price: jersey.price,
							sameOnBothSides: jersey.sameOnBothSides === "TRUE",
							sold: jersey.sold === "TRUE",
							sport: jersey.sport,
							style: jersey.style,
							team: jersey.team,
							year: jersey.year,
					})))
				)

				.catch((error) =>
					reject(error));

		});
