from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Mortgage
from .serializers import MortgageSerializer
from .credit_rating import calculate_credit_rating

class MortgageListCreateView(APIView):
    def get(self, request):
        mortgages = Mortgage.objects.all().order_by('-created_at')
        serializer = MortgageSerializer(mortgages, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = MortgageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Retrieve all mortgages to calculate the final credit rating
            all_mortgages = Mortgage.objects.all().values()
            rating = calculate_credit_rating(list(all_mortgages))
            # Update the latest mortgage with its calculated rating (or update all if needed)
            instance = serializer.instance
            instance.credit_rating = rating
            instance.save()
            data = serializer.data
            data['credit_rating'] = rating
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.generics import DestroyAPIView

class MortgageDeleteView(DestroyAPIView):
    queryset = Mortgage.objects.all()
    serializer_class = MortgageSerializer
