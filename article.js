
// Article class, each article has a title, citation, bullet points of topics in the article, a link to an image, authors, and the year it was published
class Article {
    /**
     * @param {string} title
     * @param {string} citation
     * @param {string[]} bulletPoints
     * @param {string} image
     * @param {string[]} authors
     * @param {number} year
     */

    constructor(title, citation, bulletPoints, image, authors, year) {
        this.title = title;
        this.citation = citation;
        this.bulletPoints = bulletPoints;
        this.image = image;
        this.authors = authors;
        this.year = year;
    }
}

/*
    To add an article to the page, create a new Article object in the array of articles

    Template:

    new Article(
        "Title",
        "Citation",
        ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3", "Bullet point 4"],
        "pictures/image.png",
        ["Author 1","Author 2","Author 3","Author 4","Author 5"],
        2024
    )

*/

const articles = [
    new Article(
        "Depth and structure as environmental drivers of fish communities across a shallow to mesophotic gradient in the northern US Virgin Islands",
        "Heidmann, S.L., L.K. Olinger, V.W. Brandtneris, R.S. Ennis, J. Blondeau, L.J.W. Grove, & T.B. Smith (2024) Depth and structure as environmental drivers of fish communities across a shallow to mesophotic gradient in the northern US Virgin Islands. Bulletin of Marine Science. 100(2): 133–154. https://doi.org/10.5343/bms.2023.0022",
        ["Comprehensive data on fish communities across a seascape scale", "Understanding the ecology and conservation of fishes in the western Atlantic.", "Stratified-random visual fish census", "Factors that drive fish communities on coral reefs"],
        "pictures/depth.png",
        ["Laura Jay W Grove","Jeremiah Blondeau","Sarah L Heidmann","Viktor W Brandtneris","Tyler B Smith", "Lauren K Olinger", "Rosmin S Ennis"],
        2024
    ),
    new Article(
        "A quantitative assessment of the status of reef fish communities from a large-scale probability survey in southern Florida",
        "Grove, L.J.W., S.G. Smith, J. Blondeau, & J.S. Ault (2024) A quantitative assessment of the status of reef fish communities from a large-scale probability survey in southern Florida. Bulletin of Marine Science. 100(2): 239–258. https://doi.org/10.5343/bms.2023.0020",
        ["Ecosystem-scale evaluation of reef fish community status", "Large-scale diver surveys", "Identified habitat quality issues in southeast Florida", "Fishing issues throughout the ecosystem"],
        "pictures/probability.png",
        ["Laura Jay W Grove","Jeremiah Blondeau","Steven G Smith", "Jerald S Ault"],
        2024
    ),
    new Article(
        "Expansion of an established fishery-independent survey into the US Virgin Islands' upper mesophotic zone: feasibility and management implications",
        "Grove, L.J.W., J. Blondeau, D.W. Swanson, S.L. Heidmann, S.G. Smith, M.W. Johnson, V.W. Brandtneris, S.R. Sagarese, & T.B. Smith (2024) Expansion of an established fishery-independent survey into the US Virgin Islandsʼ upper mesophotic zone: feasibility and management implications. Bulletin of Marine Science. 100(2): 113–131. https://doi.org/10.5343/bms.2023.0013",
        ["Established fishery-independent, diver-based reef fish visual survey to upper mesophotic reefs", "United States Caribbean", "Grouper, snapper, triggerfish, and parrotfish"],
        "pictures/hardbottomhabitat.png",
        ["Laura Jay W Grove","Jeremiah Blondeau","Dione W Swanson","Sarah L Heidmann","Steven G Smith","Matthew W Johnson","Viktor W Brandtneris","Skyler R Sagarese","Tyler B Smith"],
        2024
    ),
    new Article(
        "Quantifying hurricane impacts on United States Virgin Islands reef fishes using a catchability invariant approach to compare uncalibrated survey indices",
        "Langwiser, C.L., N.R. Vaughan, & L.J.W. Grove (2024) Quantifying hurricane impacts on United States Virgin Islands reef fishes using a catchability invariant approach to compare uncalibrated survey indices. Bulletin of Marine Science. 100(3): 000–000. https://doi.org/10.5343/bms.2023.0011",
        ["Identify reef fish community impacts following extreme events", "Ecologically important fish species subject to frequent severe weather disturbances", "Caribbean Sea", ],
        "pictures/hurricane.png",
        ["Caitlin Langwiser", "Nathan R Vaughan", "Laura Jay W Grove"],
        2024
    ),
    new Article(
        "A quantitative assessment of the status of benthic communities on US Atlantic coral reefs using a novel standardized approach",
        "Viehman, T.S., S.H. Groves, L.J.W. Grove, S.G. Smith, L. Mudge, C. Donovan, K. Edwards, & E.K. Towle (2024) A quantitative assessment of the status of benthic communities on US Atlantic coral reefs using a novel standardized approach. Bulletin of Marine Science. 100(2): 259–281. https://doi.org/10.5343/bms.2022.0025",
        ["Data-driven evaluation of the status of corals and benthic communities in US Atlantic coral reef jurisdictions", "Florida, Flower Garden Banks, Puerto Rico, and the US Virgin Islands", "Findings show continued declines for multiple indicators in all regions except Flower Garden Banks", "Stony Coral Tissue Loss Disease"],
        "pictures/jurisdictions.png",
        ["T Shay Viehman", "Sarah H Groves", "Laura Jay W Grove", "Steven G Smith", "Laura Mudge", "Caroline Donovan", "Kimberly Edwards", "Erica K Towle"],
        2024
    ),
    new Article(
        "Integrating the US Caribbean Reef Fish Visual Census into fishery stock assessments",
        "Ault J.S., J. Blondeau, L.J.W. Grove, S.L. Cass-Calay, & K.J. McCarthy (2024) Integrating the U.S. Caribbean reef-fish visual census into fishery stock assessments. Bulletin of Marine Science.  https://doi.org/10.5343/bms.2023.0025",
        ["Quantitative information for data-poor fisheries to support regional stock assessments", "Probabilistic stratified random sampling design capitalizing on the strong mean-variance relationship of population abundance dependent on hardbottom habitats and depths.", "Statistical catch at age models"],
        "pictures/forklength.png",
        ["Jerald S Ault", "Jeremiah Blondeau", "Laura Jay W Grove", "Shannon L Cass-Calay", "Kevin J McCarthy"],
        2024
    ),
    new Article(
        "Distribution and abundance of herbivorous reef fishes on a barrier reef system in the Florida Keys and Dry Tortugas, Florida",
        "Herbig, J.L., J.C. Olsen, J.A. Keller, L.J.W. Grove, C.P. Shea, & A. Acosta (2024) Distribution and abundance of herbivorous reef fishes on a barrier reef system in the Florida Keys and Dry Tortugas. Bulletin of Marine Science. https://doi.org/10.5343/bms.2022.0013",
        ["Habitat influences spatial patterns of herbivorous fish densities and species richness", "Florida Keys and Dry Tortugas", "Underwater visual surveys", "Herbivore occurrence, density, and species richness increased as percent of low relief hardbottom habitat"],
        "pictures/herbivore.png",
        ["Jennifer L Herbig", "Jack C Olson", "Jessica A Keller", "Laura Jay W Grove", "Colin P Shea", "Alejandro Acosta"],
        2024
    ),
    new Article(
        "Low net carbonate accretion characterizes Florida’s coral reef",
        "Morris, J.T., I.C. Enochs, N. Besemer, T.S. Viehman, S.H. Groves, J. Blondeau, C. Ames, E.K. Towle, L.J.W. Grove, & D. Manzello (2022) Low net carbonate accretion characterizes Florida’s coral reef. Scientific Reports. 12: 19582. https://doi.org/10.1038/s41598-022-23394-4",
        ["Benthic cover and parrotfish demographic data", "Results highlight the erosional state of the majority of the study sites", "Mid-channel reefs in the Florida Keys have the highest net carbonate production", "Florida reefs are in a net erosional state"],
        "pictures/spatial.png",
        ["JohnT. Morris", "Ian C. Enochs", "Nicole Besemer", "T. ShayViehman", "Sarah H.Groves", "Jeremiah Blondeau", "CoryAmes", "Erica K.Towle", "Laura Jay W.Grove", "Derek P. Manzello"],
        2022
    )
];

// Export the articles so they can be used in other classes
export { Article, articles };