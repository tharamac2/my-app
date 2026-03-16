from typing import Dict, TypedDict

class MatchResult(TypedDict):
    score: int
    total: int
    percentage: float
    details: Dict[str, bool]

# 27 Nakshatras in order
NAKSHATRAS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
    "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
]

# 12 Rasis in order
RASIS = [
    "Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya",
    "Tula", "Vrischika", "Dhanus", "Makara", "Kumbha", "Meena"
]

def get_nakshatra_index(name: str) -> int:
    try:
        return NAKSHATRAS.index(name)
    except ValueError:
        return -1

def get_rasi_index(name: str) -> int:
    try:
        return RASIS.index(name)
    except ValueError:
        return -1

def check_dina_porutham(boy_nak: int, girl_nak: int) -> bool:
    """ Dina Porutham: Good health and long life. """
    distance = (boy_nak - girl_nak) % 27
    if distance < 0:
        distance += 27
    distance += 1 # 1-based index calculation
    
    # 2, 4, 6, 8, 9, 11, 13, 15, 18, 20, 24, 26 are considered good
    good_distances = {2, 4, 6, 8, 9, 11, 13, 15, 18, 20, 24, 26}
    return distance in good_distances

def check_gana_porutham(boy_nak: int, girl_nak: int) -> bool:
    """ Gana Porutham: Matching of temperaments. """
    deva_gana = {0, 4, 6, 7, 12, 14, 26, 21, 22}
    manushya_gana = {1, 3, 5, 10, 11, 19, 20, 24, 25}
    rakshasa_gana = {2, 8, 9, 13, 15, 16, 17, 18, 23}

    boy_type = 0 if boy_nak in deva_gana else 1 if boy_nak in manushya_gana else 2
    girl_type = 0 if girl_nak in deva_gana else 1 if girl_nak in manushya_gana else 2

    # Same gana is best. Deva boy and Manushya girl is okay. Rakshasa is hard to match.
    if boy_type == girl_type:
        return True
    if boy_type == 0 and girl_type == 1:
        return True
    return False

def check_mahendra_porutham(boy_nak: int, girl_nak: int) -> bool:
    """ Mahendra Porutham: Wealth, progeny, and long lasting relationship. """
    distance = (boy_nak - girl_nak) % 27
    if distance < 0: distance += 27
    distance += 1
    return distance in {4, 7, 10, 13, 16, 19, 22, 25}

def check_stree_deergha(boy_nak: int, girl_nak: int) -> bool:
    """ Stree Deergha Porutham: Physical well-being and longevity of the female. """
    distance = (boy_nak - girl_nak) % 27
    if distance < 0: distance += 27
    return distance > 13

def check_rasi_porutham(boy_rasi: int, girl_rasi: int) -> bool:
    """ Rasi Porutham: Continuation of lineage. """
    distance = (boy_rasi - girl_rasi) % 12
    if distance < 0: distance += 12
    distance += 1
    
    return distance > 6

def calculate_compatibility(boy_n: str, boy_r: str, girl_n: str, girl_r: str) -> MatchResult:
    """
    Calculates the matching score between two individuals.
    Returns a dictionary with the score, percentage, and detailed porutham results.
    """
    b_nak = get_nakshatra_index(boy_n)
    b_rasi = get_rasi_index(boy_r)
    g_nak = get_nakshatra_index(girl_n)
    g_rasi = get_rasi_index(girl_r)

    if -1 in [b_nak, b_rasi, g_nak, g_rasi]:
        raise ValueError("Invalid Nakshatra or Rasi provided.")

    # Core 5 essential poruthams for this demo (expandable to 10)
    details = {
        "Dina": check_dina_porutham(b_nak, g_nak),
        "Gana": check_gana_porutham(b_nak, g_nak),
        "Mahendra": check_mahendra_porutham(b_nak, g_nak),
        "StreeDeergha": check_stree_deergha(b_nak, g_nak),
        "Rasi": check_rasi_porutham(b_rasi, g_rasi),
    }

    # Weighting: 2 points each for a total of 10 points
    score = sum([2 for passed in details.values() if passed])
    total = 10
    
    return {
        "score": score,
        "total": total,
        "percentage": (score / total) * 100,
        "details": details
    }

# Example usage/tester
if __name__ == "__main__":
    result = calculate_compatibility("Ashwini", "Mesha", "Rohini", "Vrishabha")
    print(f"Match Score: {result['score']}/{result['total']} ({result['percentage']}%)")
    print(result['details'])
