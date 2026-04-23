export const mockLibraries = [
    {
        city: "Stockholm",
        library: "Stockholm Public Library (Asplundhuset)",
        coordinates:[59.3434,18.0543]
    },
    {
        city: "Stockholm",
        library: "National Library of Sweden (Kungliga bibl.)",
        coordinates:[59.3384, 18.0722]
    },
    {
        city: "Uppsala",
        library: "Uppsala Public Library",
        coordinates:[59.8604, 17.6366]
    },
    {
        city: "Uppsala",
        library: "Carolina Rediviva (Uppsala University)",
        coordinates: [59.8549, 17.6311]
    },
    {
        city: "Västerås",
        library: "Västerås City Library",
        coordinates: [59.6119, 16.5448]
    },
    
    {
        library: "Drottninggatan, Stockholm",
        coordinates: [59.3342, 18.0646]
    }, 
    {  
        library: "Sergelgatan, Stockholm",
        coordinates: [59.334, 18.0644]
    }, 
    {  
        library: "Klarabergsgatan, Stockholm",
        coordinates: [59.3343, 18.0648]
    }, 
    {  
        library: "Klarabergsgatan, Stockholm",
        coordinates: [59.3346, 18.0653]
    }, 
    {  
        library: "Klarabergsgatan, Stockholm",
        coordinates: [59.3344, 18.0651]
    }, 
    {  
        library: "Hamngatan, Stockholm",
        coordinates: [59.3347, 18.0654]
    }, 
    {  
        library: "Skånegatan, Stockholm",
        coordinates: [59.3126, 18.0836]
    }, 
    {  
        library: "Skånegatan, Stockholm",
        coordinates: [59.3124, 18.0834]
    }, 
    {  
        library: "Nytorgsgatan, Stockholm",
        coordinates: [59.3127, 18.0837]
    }, 
    {  
        library: "Nytorget, Stockholm",
        coordinates: [59.3129, 18.0843]
    }, 
    {  
        library: "Nytorget, Stockholm",
        coordinates: [59.3128, 18.0841]
    }, 
    {  
        library: "Nytorget, Stockholm",
        coordinates: [59.3127, 18.0842]
    }, 
    {  
        library: "Skånegatan, Stockholm",
        coordinates: [59.3123, 18.0831]
    }, 
    {  
        library: "Hantverkargatan, Stockholm",
        coordinates: [59.3176, 18.0511]
    }, 
    {  
        library: "Hantverkargatan, Stockholm",
        coordinates: [59.3179, 18.0516]
    }, 
    {  
        library: "Hornsgatan, Stockholm",
        coordinates: [59.2971, 18.0411]
    }, 
    {  
        library: "Hornsgatan, Stockholm",
        coordinates: [59.2969, 18.0409]
    }, 
    {  
        library: "Hornsgatan, Stockholm",
        coordinates: [59.2973, 18.0416]
    }, 
    {  
        library: "Långholmsgatan, Stockholm",
        coordinates: [59.2969, 18.0406]
    }, 
    {  
        library: "Trekantsvägen, Stockholm",
        coordinates: [59.2816, 18.0321]
    }, 
    {  
        library: "Gröndalsvägen, Stockholm",
        coordinates: [59.2813, 18.0316]
    }, 
    {  
        library: "Trekantsvägen, Stockholm",
        coordinates: [59.2819, 18.0326]
    }
]

export function getLibraryName(coords) {
    if (!coords || coords.length < 2) return "Unknown";

    const match = mockLibraries.find(lib =>
        Math.abs(lib.coordinates[0] - coords[0]) < 0.0001 &&
        Math.abs(lib.coordinates[1] - coords[1]) < 0.0001
    );

    return match ? match.library : "Custom location";
}