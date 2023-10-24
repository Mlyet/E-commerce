<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getUser"])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column(nullable: true)]
    private ?string $password = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $lastname = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $birthdate = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $country = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isgoogle = null;

    #[ORM\Column(length: 500, nullable: true)]
    private ?string $idgoogle = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isfacebook = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $idfacebook = null;

    #[ORM\Column(nullable: true)]
    private ?bool $ismicrosoft = null;

    #[ORM\Column(length: 555, nullable: true)]
    private ?string $idmicrosoft = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;
        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(\DateTimeInterface $birthdate): static
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function isIsgoogle(): ?bool
    {
        return $this->isgoogle;
    }

    public function setIsgoogle(?bool $isgoogle): static
    {
        $this->isgoogle = $isgoogle;

        return $this;
    }

    public function getIdgoogle(): ?string
    {
        return $this->idgoogle;
    }

    public function setIdgoogle(?string $idgoogle): static
    {
        $this->idgoogle = $idgoogle;

        return $this;
    }

    public function isIsfacebook(): ?bool
    {
        return $this->isfacebook;
    }

    public function setIsfacebook(?bool $isfacebook): static
    {
        $this->isfacebook = $isfacebook;

        return $this;
    }

    public function getIdfacebook(): ?string
    {
        return $this->idfacebook;
    }

    public function setIdfacebook(?string $idfacebook): static
    {
        $this->idfacebook = $idfacebook;

        return $this;
    }

    public function isIsmicrosoft(): ?bool
    {
        return $this->ismicrosoft;
    }

    public function setIsmicrosoft(?bool $ismicrosoft): static
    {
        $this->ismicrosoft = $ismicrosoft;

        return $this;
    }

    public function getIdmicrosoft(): ?string
    {
        return $this->idmicrosoft;
    }

    public function setIdmicrosoft(?string $idmicrosoft): static
    {
        $this->idmicrosoft = $idmicrosoft;

        return $this;
    }
}
