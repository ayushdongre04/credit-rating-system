from django.test import TestCase
from .credit_rating import calculate_credit_rating

class CreditRatingTestCase(TestCase):
    def test_high_credit_score_and_fixed(self):
        mortgages = [{
            'credit_score': 750,
            'loan_amount': 150000,
            'property_value': 200000,
            'annual_income': 80000,
            'debt_amount': 10000,
            'loan_type': 'fixed',
            'property_type': 'single_family'
        }]
        rating = calculate_credit_rating(mortgages)
        self.assertEqual(rating, "AAA")
