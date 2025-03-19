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
						status: jersey.status,
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
						.filter(scarf => !!scarf.id)
						.map(scarf => ({
							id: scarf.id,
							ebayLink: scarf.ebayLink,
							event: scarf.event,
							league: scarf.league,
							notes: scarf.notes,
							org: scarf.org,
							photos: Number(scarf.photos),
							price: scarf.price,
							sameOnBothSides: scarf.sameOnBothSides === "TRUE",
							status: scarf.status,
							sport: scarf.sport,
							style: scarf.style,
							team: scarf.team,
							year: scarf.year,
					})))
				)

				.catch((error) =>
					reject(error));

		});
