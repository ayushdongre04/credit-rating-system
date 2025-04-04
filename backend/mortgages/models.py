from django.db import models

class Mortgage(models.Model):
    credit_score = models.IntegerField()
    loan_amount = models.FloatField()
    property_value = models.FloatField()
    annual_income = models.FloatField()
    debt_amount = models.FloatField()
    LOAN_TYPE_CHOICES = [
        ('fixed', 'Fixed'),
        ('adjustable', 'Adjustable'),
    ]
    loan_type = models.CharField(max_length=10, choices=LOAN_TYPE_CHOICES)
    PROPERTY_TYPE_CHOICES = [
        ('single_family', 'Single Family'),
        ('condo', 'Condo'),
    ]
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Optional field for storing calculated credit rating.
    credit_rating = models.CharField(max_length=10, blank=True)
    
    def __str__(self):
        return f"Mortgage {self.id} - Rating: {self.credit_rating}"
