def calculate_individual_risk(mortgage):
    risk = 0
    # Loan-to-Value Ratio
    ltv = (mortgage["loan_amount"] / mortgage["property_value"]) * 100
    if ltv > 90:
        risk += 2
    elif ltv > 80:
        risk += 1

    # Debt-to-Income Ratio
    dti = (mortgage["debt_amount"] / mortgage["annual_income"]) * 100
    if dti > 50:
        risk += 2
    elif dti > 40:
        risk += 1

    # Credit Score
    if mortgage["credit_score"] >= 700:
        risk -= 1
    elif mortgage["credit_score"] < 650:
        risk += 1

    # Loan Type
    if mortgage["loan_type"] == "fixed":
        risk -= 1
    elif mortgage["loan_type"] == "adjustable":
        risk += 1

    # Property Type
    if mortgage["property_type"] == "condo":
        risk += 1

    return risk


def calculate_credit_rating(mortgages):
    if not mortgages:
        return None

    total_risk = 0
    total_credit_score = 0
    for mortgage in mortgages:
        total_risk += calculate_individual_risk(mortgage)
        total_credit_score += mortgage["credit_score"]

    avg_credit_score = total_credit_score / len(mortgages)
    # Adjust final risk based on average credit score
    if avg_credit_score >= 700:
        total_risk -= 1
    elif avg_credit_score < 650:
        total_risk += 1

    if total_risk <= 2:
        return "AAA"
    elif 3 <= total_risk <= 5:
        return "BBB"
    else:
        return "C"
