from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import viewsets, status 
from django.contrib.auth.models import User

from api.permissions import IsOwnerOrReadOnly
from api.models import Photo, Album
from api.serializers import PhotoSerializer, AlbumSerializer, AccountSerializer, RegisterSerializer


class RegisterView(APIView):
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    queryset = User.objects.all()
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status.HTTP_200_OK)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AccountSerializer

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer 
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer 
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

